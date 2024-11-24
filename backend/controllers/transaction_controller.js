import mongoose, { model } from "mongoose";
import User from "../models/user.js";
import Figurine from "../models/figurine.js";
import Order from "../models/order.js";
import Review from "../models/review.js";
import e from "express";
import { populate } from "dotenv";

export const add2fave = async (req, res) => {
    const { figurineId, userId  } = req.body;
    try {
        const user = await User.findById(userId);
        if(user.favorites.includes(figurineId)) {
            return res.status(400).json({ success: false, message: "Figurine already in favorites" });
        }
        user.favorites.push(figurineId);
        await user.save();
        res.status(200).json({ success: true, data: user.favorites });
    }
    catch (error) {
        console.log("Error in Adding to Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const fetchFavorites = async (req, res) => {
    const { id } = req.params;// Correctly extract the userId from req.params
    try {
        const user = await User.findById(id).populate("favorites");
        if (!user) {
          console.error("User not found for ID:", userId);
          return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("Fetched User:", user);
        const favorites = user.favorites;
        res.status(200).json({ success: true, data: favorites });
      } catch (error) {
        console.error("Error Fetching Favorites:", error);
        res.status(500).json({ success: false, message: "Error in Fetching Favorites" });
      }
      
    
    
}

export const removeFavorite = async (req, res) => {
    const { userId, figurineId } = req.body;
    try {
        const user = await User.findById (userId);
        user.favorites = user.favorites.filter((fave) => fave.toString() !== figurineId);
        await user.save();
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        console.log("Error in Removing Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const checkout = async (req, res) => {
    
    try {
        const { fields, figurines, userId } = req.body;
        const user = await User.findById(userId);
       
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Please login to checkout" });
        }
    
      
    
    
       
    
        // Ensure fields and figurines are valid
        if (!fields || fields.length === 0 || !figurines || figurines.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid checkout details" });
        }
    
        const { address, payment, status, shipfee, total } = fields[0];
    
        // Format orderItems for the Order schema
        const orderItems = figurines.map((item) => ({
          qty: item.quantity,
          figurine: item.id,
        }));
    
        // Create a new order
        const newOrder = new Order({
          orderItems,
          shippingAddress: address,
          paymentMethod: payment,
          shippingPrice: shipfee,
          totalPrice: total,
          status: status,
          user: userId,
        });
    
        // Save the order to the database
        const savedOrder = await newOrder.save();
    
        // Associate the order ID with the user
        await User.findByIdAndUpdate(
          userId,
          { $push: { order: savedOrder._id } },
          { new: true }
        );
    
        // Decrease stock for each figurine
        for (const item of figurines) {
          const figurine = await Figurine.findById(item.id);
    
          // Validate figurine existence
          if (!figurine) {
            return res
              .status(404)
              .json({ success: false, message: `Figurine with ID ${item.id} not found.` });
          }
    
          // Check if sufficient stock is available
          if (figurine.stock < item.quantity) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for figurine with ID ${item.id}.`,
            });
          }
    
          // Deduct stock and save
          figurine.stock -= item.quantity;
          await figurine.save();
        }
    
        res.status(201).json({
          success: true,
          message: "Checkout successful!",
          order: savedOrder,
        });
      } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your checkout.",
        });
      }
}



export const fetchOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).populate({
            path: "order",
            model: "Order",
            populate: {
                path: "orderItems.figurine", // Populate figurines in order items
                model: "Figurine",
                 // Exclude the image field from figurines
            },
        });
    
        // Check if user exists
        if (!user) {
            console.error(`User not found for ID: ${id}`);
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    
        // Extract orders from the user
        const orders = user.order;
    
        console.log("Fetched Orders:", JSON.stringify(orders, null, 2));
    
        // Return the orders
        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Error Fetching Orders:", error.message || error);

        // Handle specific Mongoose errors if needed
        const isValidationError = error.name === "ValidationError";
        const isCastError = error.name === "CastError";

        return res.status(500).json({
            success: false,
            message: isValidationError
                ? "Invalid data format"
                : isCastError
                ? "Invalid user ID format"
                : "Error in Fetching Orders",
        });
    }
};


export const cancelOrder = async (req, res) => {
    const { orderid, id } = req.body;
    try {
        const udir = await Order.findById(orderid).populate({
            path: "orderItems.figurine", // Populate figurines in order items
            model: "Figurine",
          });
          
          if (!udir) {
            return res.status(404).json({ success: false, message: "Order not found" });
          }
          
          // Restore stocks for figurines in the order
          for (const item of udir.orderItems) {
            const figurine = item.figurine; // Populated figurine
            if (figurine) {
              figurine.stock += item.qty; // Adjust stock based on the order quantity
              await figurine.save(); // Save the updated stock
            }
          }
          
          // Update order status to 'cancelled'
          udir.status = "cancelled";
          await udir.save();
          
          const user = await User.findById(id).populate({
            path: "order",
            model: "Order",
            populate: {
              path: "orderItems.figurine",
              model: "Figurine",
            },
          });
    
        // Check if user exists
        if (!user) {
            console.error(`User not found for ID: ${id}`);
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const orders = user.order;
    
        console.log("Fetched Orders:", JSON.stringify(orders, null, 2));
    
    
        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Error Cancelling Order:", error.message || error);
        res.status(500).json({ success: false, message: "Error Cancelling Order" });
    }
}


export const createReview  = async (req, res) => {
    const { figId, comment, rating, userid, orderid } = req.body;

    try {
        const figurine = await Figurine.findById(figId);
        const user = await User.findById(userid);

        if (!figurine) {
            return res.status(404).json({ success: false, message: "Figurine not found" });
        }

        // Check if a review already exists with the same userid, figurineid, and orderid
        const existingReview = await Review.findOne({
            user: userid,
            figurine: figId,
            order: orderid,
        });

        if (existingReview) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already reviewed this figurine for this order" 
            });
        }

        // Create the review if no duplicate is found
        const review = {
            user: userid,
            figurine: figId,
            order: orderid,
            comment: comment,
            rating: rating,
        };

        const createdReview = await Review.create(review);
        const reviewid = createdReview._id;

        figurine.reviews.push(reviewid);
        await figurine.save();

        console.log(review);
        res.status(201).json({ success: true, data: createdReview });
    } catch (error) {
        console.log("Error in Creating Review: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

}

export const fetchMyReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const reviews = await Review.find({ user: id }) // Find reviews by user ID
            .populate({
                path: 'user', // Populate the `user` field
                select: 'name email avatar', // Specify the fields to include (optional)
            })
            .populate({
                path: 'figurine', // If `figurine` is also referenced, populate it
                select: 'name price images', // Specify fields to include (optional)
            })
            .populate({
                path: 'order', // If `order` is also referenced, populate it
                select: '_id', // Specify fields to include (optional)
            });
    
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this user" });
        }
    
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const editMyReview = async (req, res) => {
    console.log(req.body);
    const { comment, rating, id } = req.body;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        
        review.comment = comment;
        review.rating = rating;
        await review.save();

        res.status(200).json({ success: true, data: review });
    }
    catch (error) {
        console.log("Error in Editing Review: ", error.message);
        res.status(500).json({ success: false, error: error });
    }
}

export const fetchFigReview = async (req, res) => {
    const { figId } = req.params;

    try {
        const reviews = await Review.find({ figurine: figId })
            .populate({
                path : 'user',
                select: '',
            
            });
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this figurine" });
        }
        res.status(200).json({ success: true, data: reviews });
    }
    catch (error) {
        console.log("Error in Fetching Reviews: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
