import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // ✅ Handle file uploads

// 📌 CREATE Profile
router.post("/", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const { userId, name, email, phone, bio, skills, resume, education, experience, linkedin, github } = req.body;

    if (!userId || !name || !email || !phone || !bio || !skills || !resume || !education || !experience) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    let profileExists = await Profile.findOne({ userId });
    if (profileExists) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const newProfile = new Profile({
      userId,
      name,
      email,
      phone,
      bio,
      skills: skills.split(","), // ✅ Convert skills from comma-separated string to array
      resume,
      education,
      experience,
      linkedin,
      github,
      profilePicture: req.file ? req.file.buffer.toString("base64") : null, // ✅ Handle image upload
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created!", profile: newProfile });

  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
