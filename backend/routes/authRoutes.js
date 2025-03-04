import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Generate unique referral code
const generateReferralCode = () => Math.random().toString(36).substr(2, 8);

// 📌 Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, userType, referralCode } = req.body;

  try {
    // 🔹 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    // 🔹 Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Check if referral code is valid
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (!referrer) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
      referredBy = referrer._id;
    }

    // 🔹 Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      referralCode: generateReferralCode(), // Generate unique code
      referredBy,
    });

    await newUser.save();

    // 🔹 Remove password before sending response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({ message: "User registered successfully!", user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    // 🔹 Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    // 🔹 Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔹 Remove password before sending response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({ message: "Login successful!", token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 📌 Get Logged-in User Details (Protected Route)
router.get("/user", async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password"); // Exclude password
      res.json({ user });
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  });
  

export default router;
