
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

app.use(express.json());  // Allows to accept JSON data in the req.body

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();
    console.log("Server Started at http://localhost:" + PORT);
});
