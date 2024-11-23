
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.js"; 
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
    sendVerificationEmail, 
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
} from "../utils/emails.js";
import ErrorHandler from '../utils/errorHandler.js'; 
import { auth } from '../utils/firebase.js';

import cloudinary from "../utils/cloudinaryConfig.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

export const signup = async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;
    try {
        if ( !username || !firstname || !lastname || !email || !password) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours   
        });
        await user.save();

        // JWT
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, user.verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    console.log("Body:", req.body);

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Invalid or expired verification code");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.firstname);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "Email not verified" });
        }
        
        const userid = user._id;
        // JWT
        generateTokenAndSetCookie(res, userid);
   
        await user.save();

        res.status(200).json({
            success: true,
            message: user.isAdmin ? "Logged in successfully as admin" : "Logged in successfully as user",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const googlelogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const email = decodedToken.email;
        const firebaseUid = decodedToken.uid;

        console.log("Decoded Token:", decodedToken);

        let user = await User.findOne({ email });
        if (!user) {
            const fullName = decodedToken.name || "Google User";
            const [firstname, lastname = ""] = fullName.split(" ", 2);

            // unique username
            let username = fullName.replace(/\s+/g, "_").toLowerCase();
            let usernameExists = await User.findOne({ username });
            while (usernameExists) {
                username = `${username}_${crypto.randomBytes(3).toString("hex")}`;
                usernameExists = await User.findOne({ username });
            }

            // Generate a secure random password
            const randomPassword = crypto.randomBytes(8).toString("hex"); // Ensures at least 16 characters

            // Create a new user if not found
            user = new User({
                username,
                firstname,
                lastname,
                email,
                password: randomPassword,
                firebaseUid,
                address: "N/A", // Default address
                isVerified: true,
            });

            await user.save();
        }

        // Generate JWT and set cookie
        generateTokenAndSetCookie(res, user._id);
        
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            },
        });
    } catch (error) {
        console.error("Error verifying Google ID token:", error);
        res.status(400).json({ success: false, message: "Invalid Google ID token" });
    }
};


export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

export const updateProfile = async (req, res) => {
  const { userId, username, firstname, lastname, email, address, phone } = req.body;
  const image = req.file;

  console.log("Image:", image);
  console.log("Request Body:", req.body);
  console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.username = username || user.username;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    if (image) {
      if (user.image?.public_id) {
        await cloudinary.uploader.destroy(user.image.public_id);
      }
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_image" },
          (error, result) => {
            if (error) {
              reject(new Error("Error uploading avatar to Cloudinary"));
            } else {
              resolve(result);
            }
          }
        );
        stream.end(image.buffer);
      });

      user.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again." });
  }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // Update password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json({
            success: true,
            count: users.length, // Count the fetched users
            users, // Return the list of users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        next(new ErrorHandler("Error fetching users", 500)); // Use the ErrorHandler
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password"); // Exclude password from the result
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get current user
export const getCurrentUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id); // include password
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};