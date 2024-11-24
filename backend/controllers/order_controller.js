import mongoose from "mongoose";
import Order from "../models/order.js";

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

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Order with id: ${id}`);

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.log("Error Updating Order: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
