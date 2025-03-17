import mongoose from "mongoose";

const alumniProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  currentCompany: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  openToReferral: {
    type: Boolean,
    default: false,
  },
  skills: {
    type: [String],
    required: true,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  resume: {
    type: String,
  },
  profilePicture: {
    type: String, // Store as base64 string
  },
});

const AlumniProfile = mongoose.model("AlumniProfile", alumniProfileSchema);

export default AlumniProfile;