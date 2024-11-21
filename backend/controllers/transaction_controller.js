import mongoose from "mongoose";
import User from "../models/user.js";
import Figurine from "../models/figurine.js";

export const add2fave = async (req, res) => {
    const { figurineId, userId  } = req.body;
    try {
        const user = await User.findById(userId);
        if(user.favorites.includes(figurineId)) {
            return res.status(400).json({ success: false, message: "Figurine already in favorites" });
        }
        user.favorites.push(figurineId);
        await user.save();
        res.status(200).json({ success: true, data: user.favorites });
    }
    catch (error) {
        console.log("Error in Adding to Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const fetchFavorites = async (req, res) => {
    const { id } = req.params;// Correctly extract the userId from req.params
    try {
        const user = await User.findById(id).populate("favorites");
        if (!user) {
          console.error("User not found for ID:", userId);
          return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("Fetched User:", user);
        const favorites = user.favorites;
        res.status(200).json({ success: true, data: favorites });
      } catch (error) {
        console.error("Error Fetching Favorites:", error);
        res.status(500).json({ success: false, message: "Error in Fetching Favorites" });
      }
      
    
    
}

export const removeFavorite = async (req, res) => {
    const { userId, figurineId } = req.body;
    try {
        const user = await User.findById (userId);
        user.favorites = user.favorites.filter((fave) => fave.toString() !== figurineId);
        await user.save();
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        console.log("Error in Removing Favorite: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}