import mongoose from "mongoose";
import Order from "../models/order.js";
import Figurine from "../models/figurine.js";
import { sendOrderDetailsEmail } from "../utils/emails.js";

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

    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: `No Order with id: ${id}` });
    }

    try {
        // Find and update the order with the new details
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

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
        };

        console.log("Updated Order with Figurine Details: ", enrichedOrder);

        // Send email if the order status is updated to 'shipping'
        if (req.body.status === "shipping") {
            try {
                const userEmail = updatedOrder?.user?.email || "kylasalardaa@gmail.com"; // Default email as fallback
                console.log("Sending email to:", userEmail);
                await sendOrderDetailsEmail(userEmail, enrichedOrder);
            } catch (emailError) {
                console.error("Error sending email:", emailError.message);
            }
        }

        // Send the enriched order as the response
        res.status(200).json({ success: true, data: enrichedOrder });
    } catch (error) {
        console.error("Error Updating Order:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


