import mongoose from "mongoose";
import Figurine from "./figurine.js";

const promoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the promo"],
    },
    discount: {
        type: Number,
        required: [true, "Please enter the discount of the promo"],
    },
    image: {
        type: String,
        required: [true, "Please enter the image of the promo"],
    },
    figurine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Figurine",
    },
    description: {
        type: String,
        required: [true, "Please enter the description of the promo"],
    },
    expiry: {
        type: Date,
        required: [true, "Please enter the expiry of the promo"],
    },
},{
    timestamps: true,
});

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;