import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));

// Middleware
app.use(cookieParser());
app.use(cors());

// Router Connection
import figurineRoutes from "./routes/figurine_route.js";
app.use("/api/figurines", figurineRoutes);

// Export the app
export default app;
