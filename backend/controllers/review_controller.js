import mongoose from "mongoose";
import Review from "../models/review.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, data: reviews, count: reviews.length });
    } catch (error) {
        console.log("Error in Fetching Reviews: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.log("Error in Fetching Review: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteReview = async (req, res) => {
    const { id } = req.params;
    // console.log("Deleting Review with ID: ", id);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Review with id: ${id}`);

    try {
        await Review.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log("Error Deleting Review: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}