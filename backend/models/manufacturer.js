import mongoose from "mongoose";

const manufacturerSchema = mongoose.Schema({
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
},{
    timestamps: true,
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

export default Manufacturer;