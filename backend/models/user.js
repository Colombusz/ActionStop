import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
        unique: true,
    },
    firstname: {
        type: String,
        required: [true, "Please enter your first name"],
        maxLength: [30, "Your first name cannot exceed 30 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter your last name"],
        maxLength: [30, "Your last name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be at least 6 characters"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;