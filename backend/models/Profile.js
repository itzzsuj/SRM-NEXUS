import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true }, // ✅ Change skills to an array of strings
  resume: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String, required: true },
  linkedin: { type: String },
  github: { type: String },
  profilePicture: { type: String }, // ✅ Optional field for profile picture URL
});

export default mongoose.model("Profile", ProfileSchema);
