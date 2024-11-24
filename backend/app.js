import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import figurineRoutes from "./routes/figurine_route.js";
import reviewRoutes from "./routes/review_route.js";
import authRoutes from "./routes/auth_route.js";
import transactionRoutes from "./routes/transact_route.js";
import orderRoutes from "./routes/order_route.js";

const app = express();

// Middleware for parsing request bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173", // Development origin
    // Add Production origin here
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// Middleware for setting security headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Router Connection
app.use("/api/figurines", figurineRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/orders", orderRoutes);

// Fallback for unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;
