import React, { useState } from "react";
import { 
  Box, TextField, Button, Typography, Paper, Avatar, Grid, Divider, IconButton 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar Component

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    resume: "",
    education: "",
    experience: "",
    linkedin: "",
    github: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProfileData({ ...profileData, profilePicture: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized: Please log in again.");
        navigate("/login");
        return;
      }

      // Decode JWT to extract userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Creating FormData for file uploads
      const formData = new FormData();
      formData.append("userId", userId);
      Object.keys(profileData).forEach((key) => {
        if (profileData[key]) formData.append(key, profileData[key]);
      });

      // API Request
      const response = await axios.post("http://localhost:5001/profile", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("🎉 Profile Created Successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("❌ Error creating profile:", error.response?.data?.error || error.message);
      alert(`Something went wrong: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#F5F7FA" }}>
      {/* ✅ Sidebar */}
      <Sidebar />

      {/* ✅ Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#333">
          Profile Settings
        </Typography>

        <Grid container spacing={3}>
          {/* ✅ Profile Info Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: "12px", boxShadow: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  bgcolor: "#FFA500",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
                src={profileData.profilePicture ? URL.createObjectURL(profileData.profilePicture) : undefined}
              >
                {!profileData.profilePicture && "U"}
              </Avatar>
              <Typography variant="h6" mt={2} fontWeight="bold">
                {profileData.name || "Your Name"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profileData.email || "your.email@example.com"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="profile-picture-upload">
                <IconButton component="span">
                  <EditIcon color="primary" />
                </IconButton>
              </label>
            </Paper>
          </Grid>

          {/* ✅ Profile Form Card */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: "12px", boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Edit Profile
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField fullWidth name="name" label="Full Name" variant="outlined" value={profileData.name} onChange={handleChange} />
                <TextField fullWidth name="email" label="Email" variant="outlined" value={profileData.email} onChange={handleChange} />
                <TextField fullWidth name="phone" label="Phone Number" variant="outlined" value={profileData.phone} onChange={handleChange} />
                <TextField fullWidth name="bio" label="Bio" variant="outlined" value={profileData.bio} onChange={handleChange} />
                <TextField fullWidth name="skills" label="Skills (comma-separated)" variant="outlined" value={profileData.skills} onChange={handleChange} />
                <TextField fullWidth name="education" label="Education" variant="outlined" value={profileData.education} onChange={handleChange} />
                <TextField fullWidth name="experience" label="Experience" variant="outlined" value={profileData.experience} onChange={handleChange} />
                <TextField fullWidth name="linkedin" label="LinkedIn Profile" variant="outlined" value={profileData.linkedin} onChange={handleChange} />
                <TextField fullWidth name="github" label="GitHub Profile" variant="outlined" value={profileData.github} onChange={handleChange} />
                <TextField fullWidth name="resume" label="Resume Link (Google Drive / LinkedIn)" variant="outlined" value={profileData.resume} onChange={handleChange} />
                <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: "#007BFF", color: "#fff", fontWeight: "bold" }}>
                  Save Profile
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateProfile;
