import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ["student", "alumni"] },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   // New Profile Fields
   bio: String,
   skills: [String],
   projects: [{ title: String, description: String, link: String }],
   resume: String, // URL of uploaded resume
});


export default mongoose.model("User", userSchema);
