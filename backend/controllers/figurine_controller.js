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
        // DEBUGGING
        // console.log("Req Body: ", req.body);
        const { name, price, description, origin, classification } = req.body;
        const images = req.files;

        let parsedManufacturers;
        if (req.body["manufacturer.name"] && req.body["manufacturer.country"]) {
            parsedManufacturers = [
                {
                    name: req.body["manufacturer.name"],
                    country: req.body["manufacturer.country"],
                }, 
            ];
        } else {
            return res.status(400).json({
                success: false,
                message: "Manufacturer information is incomplete. Please provide both 'name' and 'country'.",
            });
        }

        // Validate required fields
        if (!name || !price || !description || !origin || !classification) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields.",
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
            manufacturer: parsedManufacturers,
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

    // 404 not found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Figurine with id: ${id}`);
    
    const figurine = await Figurine.findById(id);
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
    } else {
        imageLinks = figurine.images;
    }

    // Manufacturer || INSOMNIA TESTING || NOT WORKING SA APP KAPAG NAKA UNCOMMENT
    // let manufacturer;
    // try {
    //     manufacturer = JSON.parse(req.body.manufacturer);

    //     // Validate the parsed manufacturer array
    //     if (!Array.isArray(manufacturer)) {
    //         throw new Error("Manufacturer must be an array of objects.");
    //     }

    //     manufacturer.forEach((manu) => {
    //         if (!manu.name || !manu.country) {
    //             throw new Error("Each manufacturer must have 'name' and 'country' properties.");
    //         }
    //     });
    // } catch (error) {
    //     return res.status(400).json({
    //         success: false,
    //         message: `Invalid manufacturer format: ${error.message}`,
    //     });
    // }

    const updatedData = {
        ...req.body,
        // manufacturer,
        images: imageLinks
    };

    try {
        const updatedFigurine = await Figurine.findByIdAndUpdate(
            id, 
            updatedData,
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No Figurine with id: ${id}`);
    }

    try {
        const figurine = await Figurine.findById(id);
        if (!figurine) {
            return res.status(404).json({ success: false, message: "Figurine not found" });
        }

        // Cloudinary Delete Images
        if (figurine.images && figurine.images.length > 0) {
            await Promise.all(
                figurine.images.map(async (image) => {
                    await cloudinary.uploader.destroy(image.public_id);
                })
            );
        }

        // Delete the figurine from the database
        await Figurine.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Figurine deleted successfully" });
    } catch (error) {
        console.error("Error Deleting Figurine:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};