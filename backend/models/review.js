import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the reviewer"],
    },
    rating: {
        type: Number,
        required: [true, "Please enter the rating of the review"],
    },
    comment: {
        type: String,
        required:  [true, "Please enter the comment of the review"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    
},{
    timestamps: true,
});