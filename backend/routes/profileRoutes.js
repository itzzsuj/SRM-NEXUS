import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Handle file uploads

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
      skills: skills.split(","), // Convert skills from comma-separated string to array
      resume,
      education,
      experience,
      linkedin,
      github,
      profilePicture: req.file ? req.file.buffer.toString("base64") : null, // Handle image upload
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created!", profile: newProfile });

  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 GET Profile by User ID
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Convert MongoDB-specific fields to a clean format
    const cleanProfile = {
      _id: profile._id.toString(), // Convert ObjectId to string
      userId: profile.userId.toString(), // Convert ObjectId to string
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
      skills: profile.skills,
      resume: profile.resume,
      education: profile.education,
      experience: profile.experience,
      linkedin: profile.linkedin,
      github: profile.github,
      profilePicture: profile.profilePicture,
    };

    res.status(200).json({ profile: cleanProfile }); // Return clean data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 UPDATE Profile
router.put("/:userId", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const { userId, name, email, phone, bio, skills, resume, education, experience, linkedin, github } = req.body;

    if (!userId || !name || !email || !phone || !bio || !skills || !resume || !education || !experience) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const updatedProfile = {
      name,
      email,
      phone,
      bio,
      skills: skills.split(","), // Convert skills from comma-separated string to array
      resume,
      education,
      experience,
      linkedin,
      github,
      profilePicture: req.file ? req.file.buffer.toString("base64") : null, // Handle image upload
    };

    const profile = await Profile.findOneAndUpdate(
      { userId },
      updatedProfile,
      { new: true } // Return the updated profile
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated!", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;