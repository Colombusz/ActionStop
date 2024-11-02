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
    }
    
},{
    timestamps: true,
});

const Figurine = mongoose.model("Figurine", figurineSchema);

export default Figurine;

