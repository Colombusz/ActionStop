import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Router Connection
import figurineRoutes from "./routes/figurine_route.js";
app.use("/api/figurines", figurineRoutes);

// Export the app
export default app;
