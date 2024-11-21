import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import figurineRoutes from "./routes/figurine_route.js";
import manufacturerRoutes from "./routes/manufacturer_route.js";
import promoRoutes from "./routes/promo_route.js";
import authRoutes from "./routes/auth_route.js";

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));

// Middleware, CORS Configuration
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Router Connection
app.use("/api/figurines", figurineRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/auth", authRoutes);


export default app;
