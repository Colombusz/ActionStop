import mongoose from "mongoose";

const figurineSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the figurine"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of the figurine"],
    },
    image: {
        type: String,
        required:  [true, "Please enter the image of the figurine"],
    },
    origin: {
        type: String,
        required: [true, "Please enter the origin of the figurine"],
    },
    classification: {
        type: String,
        required: [true, "Please enter the classification of the figurine"],
        enum: {
            values: [
                "Western",
                "Anime",
                "Manga",
                "Fantasy",
                "Other",
            ],
            message: "Please select the correct classification for the figurine",
        },
    },
    manufacturer: [{
        name: {
            type: String,
            required: [true, "Please enter the name of the manufacturer"],
        },
        country: {
            type: String,
            required: [true, "Please enter the country of the manufacturer"],
        },
        image: {
            type: String,
            required:  [true, "Please enter the image of the manufacturer"],
        },
    }],
    reviews: [{
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
    }],
    
},{
    timestamps: true,
});

const Figurine = mongoose.model("Figurine", figurineSchema);

export default Figurine;

