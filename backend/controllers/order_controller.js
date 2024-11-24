import mongoose from "mongoose";
import Order from "../models/order.js";
import Figurine from "../models/figurine.js";
import { sendOrderDetailsEmail } from "../utils/emails.js";
import { sendNotification } from "../utils/firebase.js";
import User from "../models/user.js";

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({
            success: true,
            data: orders,
            count: orders.length,
        });
    } catch (error) {
        console.log("Error in Fetching Orders: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: `No Order with id: ${id}` });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        console.log("Update Order Request: ", updatedOrder);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        const userBuyer = await User.findById(updatedOrder.user._id);
        console.log("User Buyer Credentials: ", userBuyer);
        const FCMToken = userBuyer.FCMToken;

        // Fetch figurine details for all figurines in the order
        const figurineDetails = await Figurine.find({
            _id: { $in: updatedOrder.orderItems.map(item => item.figurine) },
        });
        // Append figurine details to order items
        const enrichedOrderItems = updatedOrder.orderItems.map(item => {
            const figurine = figurineDetails.find(f => f._id.equals(item.figurine));
            return {
                ...item.toObject(),
                figurineDetails: figurine ? figurine.toObject() : null,
            };
        });

        // Enrich the order with full figurine details
        const enrichedOrder = {
            ...updatedOrder.toObject(),
            orderItems: enrichedOrderItems,
            username: userBuyer.username,
        };

        console.log("Updated Order with Figurine Details: ", enrichedOrder);

        // Send email if the order status is updated to 'shipping'
        if (req.body.status === "shipping") {
            try {
                const userEmail = "kylasalardaa@gmail.com" || userBuyer.email; // Original Buyer email
                console.log("Sending email to:", userEmail);
                await sendOrderDetailsEmail(userEmail, enrichedOrder);
            } catch (emailError) {
                console.error("Error sending email:", emailError.message);
            }
        }

        await sendNotification(FCMToken, `Order Stat: ${req.body.status}`, "");
        res.status(200).json({ success: true, data: enrichedOrder });
    } catch (error) {
        console.error("Error Updating Order:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


