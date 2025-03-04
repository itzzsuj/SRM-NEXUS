import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Avatar, Grid, Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar Component

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: "",
    skills: "",
    resume: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
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

      const payload = { ...profileData, userId };

      await axios.post("http://localhost:5001/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🎉 Profile Created Successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("❌ Error creating profile:", error.response?.data?.error || error.message);
      alert("Something went wrong. Try again!");
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
              >
                U
              </Avatar>
              <Typography variant="h6" mt={2} fontWeight="bold">
                Your Name
              </Typography>
              <Typography variant="body2" color="textSecondary">
                your.email@example.com
              </Typography>
              <Divider sx={{ my: 2 }} />
              <IconButton>
                <EditIcon color="primary" />
              </IconButton>
            </Paper>
          </Grid>

          {/* ✅ Profile Form Card */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: "12px", boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Edit Profile
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField fullWidth name="bio" label="Bio" variant="outlined" value={profileData.bio} onChange={handleChange} />
                <TextField fullWidth name="skills" label="Skills (comma-separated)" variant="outlined" value={profileData.skills} onChange={handleChange} />
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
