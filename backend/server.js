import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"; // Authentication Routes
import profileRoutes from "./routes/profileRoutes.js"; // Profile Routes

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Fix MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB fails to connect
  }
};
connectDB();

// Use Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
