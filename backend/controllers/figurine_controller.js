import mongoose from "mongoose";
import figurine from "../models/figurine.js";
import Figurine from "../models/figurine.js";

export const getFigurines = async (req, res) => {
    try {
        const figurines = await figurine.find();
        res.status(200).json({success: true, data: figurines});
    } catch (error) {
        console.log("Error in Fetching Figurines: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getFigurine = async (req, res) => {
    try {
        const figurine = await figurine.findById(req.params.id);
        res.status(200).json({success: true, data: figurine});
    } catch (error) {
        console.log("Error in Fetching Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createFigurine = async (req, res) => {
    const figurine = req.body;

    if(!figurine.name || !figurine.price || !figurine.image || !figurine.origin || !figurine.classification) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const newFigurine = new Figurine(figurine);

    try {
        await newFigurine.save();
        res.status(201).json({success: true, data: figurine});
    } catch (error) {
        console.log("Error in Creating Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateFigurine = async (req, res) => {
    const { id } = req.params;
    const figurine = req.body;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Figurine with id: ${id}`);

    try {
        const updatedFigurine = await figurine.findByIdAndUpdate(id, figurine, { new: true });
        res.status(200).json({success: true, data: updatedFigurine});
    }catch (error) {
        console.log("Error Updating Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteFigurine = async (req, res) => {
    const { id } = req.params;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Figurine with id: ${id}`);

    try {
        await figurine.findByIdAndRemove(id);
        res.status(200).json({success: true, message: "Figurine deleted successfully"});
    } catch (error) {
        console.log("Error Deleting Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}