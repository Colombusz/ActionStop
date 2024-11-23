import mongoose from "mongoose";

const figurineSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the figurine"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of the figurine"],
        maxlength: [5, "Price cannot exceed 5 characters"],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter the description of the figurine"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    origin: {
        type: String,
        required: [true, "Please enter the origin of the figurine"],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
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
    }],
    reviews:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    },
    
},{
    timestamps: true,
});

const Figurine = mongoose.model("Figurine", figurineSchema);

export default Figurine;

