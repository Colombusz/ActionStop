import mongoose from "mongoose";
import Favorite from "../models/favorite.js";


export const add2fave = async (req, res) => {
    const { user, figurine } = req.body;

    if (!user || !figurine) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingFavorite = await Favorite.findOne({ user, figurine });

        if (existingFavorite) {
            return res.status(400).json({ success: false, message: "This figurine is already in your favorites" });
        }
        const newFavorite = new Favorite({
            user,
            figurine,
        });
e
        await newFavorite.save();

        res.status(201).json({ success: true, data: newFavorite });
    } catch (error) {
        console.log("Error in Adding to Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const remove2fave = async (req, res) => {
    const { user, figurine } = req.body;

    if (!user || !figurine) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingFavorite = await Favorite.findOne({ user, figurine });

        if (!existingFavorite) {
            return res.status(400).json({ success: false, message: "This figurine is not in your favorites" });
        }

        await existingFavorite.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.log("Error in Removing from Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
