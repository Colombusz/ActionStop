import mongoose from "mongoose";
import Figurine from "../models/figurine.js";
import cloudinary from "../utils/cloudinaryConfig.js";

/*  All Figurines properties
    name, price, description, images, origin, classification, manufacturer, reviews
*/

// Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      stream.end(buffer);
    });
};

export const getFigurines = async (req, res) => {
    try {
        const figurines = await Figurine.find({});
        res.status(200).json({
            success: true, 
            data: figurines,
            count: figurines.length,
        });
    } catch (error) {
        console.log("Error in Fetching Figurines: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getFigurine = async (req, res) => {
    const { id } = req.params;

    try {
        const figurine = await Figurine.findById(id);
        res.status(200).json({success: true, data: figurine});
    } catch (error) {
        console.log("Error in Fetching Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createFigurine = async (req, res) => {
    try {
        // Extract figurine details and files
        const { name, price, description, origin, classification, manufacturer } = req.body;
        const images = req.files;

        // Check for missing required fields
        if (!name || !price || !description || !origin || !classification || !manufacturer) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields",
            });
        }

        // Validate classification
        const validClassifications = ["Western", "Anime", "Manga", "Fantasy", "Other"];
        if (!validClassifications.includes(classification)) {
            return res.status(400).json({
                success: false,
                message: "Invalid classification. Choose from Western, Anime, Manga, Fantasy, Other.",
            });
        }

        // Validate and upload images
        let imageLinks = [];
        if (images && images.length > 0) {
            for (let file of images) {
                try {
                    const result = await uploadToCloudinary(file.buffer);
                    imageLinks.push({ public_id: result.public_id, url: result.secure_url });
                } catch (error) {
                    console.error("Cloudinary upload error: ", error.message);
                    return res.status(500).json({
                        success: false,
                        message: "Image upload failed. Please try again.",
                    });
                }
            }
        }

        // Create new figurine
        const newFigurine = new Figurine({
            name,
            price,
            description,
            images: imageLinks,
            origin,
            classification,
            manufacturer: [],
            reviews: [],
        });

        await newFigurine.save();

        res.status(201).json({
            success: true,
            data: newFigurine,
        });
    } catch (error) {
        console.error("Error in Creating Figurine: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const updateFigurine = async (req, res) => {
    const { id } = req.params;
    const figurine = req.body;

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Figurine with id: ${id}`);

    const images = req.files;
    let imageLinks = [];

    if(images && images.length > 0) {
        // Delete images from cloudinary
        await Promise.all(
            figurine.images.map(async (image) => {
                await cloudinary.uploader.destroy(image.public_id);
            })
        );

        for (let i = 0; i < images.length; i++) {
            const result = await uploadToCloudinary(images[i].buffer);
            imageLinks.push({ public_id: result.public_id, url: result.secure_url });
        }
    }

    try {
        const updatedFigurine = await Figurine.findByIdAndUpdate(
            id, 
            { ...figurine, images: imageLinks.length > 0 ? imageLinks : figurine.images }, 
            { new: true }
        );
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

    // Cloudinary Delete Images
    await Promise.all(
        figurine.images.map(async (image) => {
            await cloudinary.uploader.destroy(image.public_id);
        })
    );

    try {
        await Figurine.findByIdAndRemove(id);
        res.status(200).json({success: true, message: "Figurine deleted successfully"});
    } catch (error) {
        console.log("Error Deleting Figurine: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}