import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to check authentication

const router = express.Router();

// 📌 GET Profile for a User
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId, bio, skills, resume } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Check if profile already exists
    let profile = await Profile.findOne({ userId });
    if (profile) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    // Create new profile
    profile = new Profile({
      userId,
      bio,
      skills,
      resume,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created!", profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// 📌 UPDATE Profile
router.put("/:userId", authMiddleware, async (req, res) => {
  try {
    const { bio, skills, resume } = req.body;
    let profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { bio, skills, resume },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ message: "Profile updated!", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;