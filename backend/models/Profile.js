import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Change 'user' to 'userId'
  bio: { type: String, required: true },
  skills: { type: String, required: true },
  resume: { type: String, required: true },
});

export default mongoose.model("Profile", ProfileSchema);
