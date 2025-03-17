import express from "express";
import AlumniProfile from "../models/AlumniProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Handle file uploads

// 📌 CREATE Alumni Profile
router.post("/", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const { userId, name, email, phone, bio, currentCompany, role, openToReferral, skills, linkedin, github, resume } = req.body;

    if (!userId || !name || !email || !phone || !bio || !currentCompany || !role || !skills) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    let profileExists = await AlumniProfile.findOne({ userId });
    if (profileExists) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const newProfile = new AlumniProfile({
      userId,
      name,
      email,
      phone,
      bio,
      currentCompany,
      role,
      openToReferral,
      skills: skills.split(","), // Convert skills from comma-separated string to array
      linkedin,
      github,
      resume,
      profilePicture: req.file ? req.file.buffer.toString("base64") : null, // Handle image upload
    });

    await newProfile.save();
    res.status(201).json({ message: "Alumni profile created!", profile: newProfile });
  } catch (error) {
    console.error("Error creating alumni profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 GET Alumni Profile by User ID
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ profile: null });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching alumni profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 UPDATE Alumni Profile
router.put("/:userId", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const { userId, name, email, phone, bio, currentCompany, role, openToReferral, skills, linkedin, github, resume } = req.body;

    if (!userId || !name || !email || !phone || !bio || !currentCompany || !role || !skills) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const updatedProfile = {
      name,
      email,
      phone,
      bio,
      currentCompany,
      role,
      openToReferral,
      skills: skills.split(","), // Convert skills from comma-separated string to array
      linkedin,
      github,
      resume,
      profilePicture: req.file ? req.file.buffer.toString("base64") : null, // Handle image upload
    };

    const profile = await AlumniProfile.findOneAndUpdate(
      { userId },
      updatedProfile,
      { new: true } // Return the updated profile
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ message: "Alumni profile updated!", profile });
  } catch (error) {
    console.error("Error updating alumni profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;