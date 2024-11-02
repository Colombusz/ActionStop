import mongoose from "mongoose";
import Promo from "./promo.js";

export const getPromos = async (req, res) => {
    try {
        const promos = await Promo.find();
        res.status(200).json({success: true, data: promos});
    } catch (error) {
        console.log("Error in Fetching Promos: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getPromo = async (req, res) => {
    try {
        const promo = await Promo.findById(req.params.id);
        res.status(200).json({success: true, data: promo});
    } catch (error) {
        console.log("Error in Fetching Promo: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createPromo = async (req, res) => {
    try {
        const promo = await Promo.create(req.body);
        res.status(201).json({success: true, data: promo});
    } catch (error) {
        console.log("Error in Creating Promo: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updatePromo = async (req, res) => {
    const { id } = req.params;
    const promo = req.body;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Promo with id: ${id}`);

    try {
        const updatedPromo = await Promo.findByIdAndUpdate(id, promo, { new: true });
        res.status(200).json({success: true, data: updatedPromo});
    }catch (error) {
        console.log("Error Updating Promo: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deletePromo = async (req, res) => {
    const { id } = req.params;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Promo with id: ${id}`);

    try {
        await Promo.findByIdAndRemove(id);
        res.status(200).json({success: true, message: "Promo deleted successfully"});
    } catch (error) {
        console.log("Error Deleting Promo: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


