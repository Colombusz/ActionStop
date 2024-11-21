import mongoose from "mongoose";
import Favorite from "../models/favorite.js";


export const add2fave = async (req, res) => {
    const favorite = req.body;

    if(!favorite.user || !favorite.figurine) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const newFavorite = new Favorite(favorite);

    try {
        await newFavorite.save();
        res.status(201).json({success: true, data: favorite});
    } catch (error) {
        console.log("Error in Adding to Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}