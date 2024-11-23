import mongoose from "mongoose";
import User from "../models/user.js";
import Figurine from "../models/figurine.js";
import Order from "../models/order.js";

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
