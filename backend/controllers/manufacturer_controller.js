import mongoose from "mongoose";
import Manufacturer from "../models/manufacturer";

export const getManufacturers = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.status(200).json({success: true, data: manufacturers});
    } catch (error) {
        console.log("Error in Fetching Manufacturers: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        res.status(200).json({success: true, data: manufacturer});
    } catch (error) {
        console.log("Error in Fetching Manufacturer: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.create(req.body);
        res.status(201).json({success: true, data: manufacturer});
    } catch (error) {
        console.log("Error in Creating Manufacturer: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateManufacturer = async (req, res) => {
    const { id } = req.params;
    const manufacturer = req.body;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Manufacturer with id: ${id}`);

    try {
        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(id, manufacturer, { new: true });
        res.status(200).json({success: true, data: updatedManufacturer});
    }catch (error) {
        console.log("Error Updating Manufacturer: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteManufacturer = async (req, res) => {
    const { id } = req.params;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Manufacturer with id: ${id}`);

    try {
        await Manufacturer.findByIdAndRemove(id);
        res.status(200).json({success: true, message: "Manufacturer deleted successfully"});
    } catch (error) {
        console.log("Error Deleting Manufacturer: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

