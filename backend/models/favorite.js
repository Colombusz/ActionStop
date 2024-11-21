import mongoose from "mongoose";


const favoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    figurine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Figurine",
    },
    
},{
    timestamps: true,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;


