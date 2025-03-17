import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, Grid, Divider, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AlumniProfileDash = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Unauthorized: Please log in again.");
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`http://localhost:5001/alumni-profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.profile) {
          setProfileData(response.data.profile);
        } else {
          setError("Profile not found.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data?.error || error.message);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Alumni Profile
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 auto" }}
              src={profileData.profilePicture || undefined}
            >
              {!profileData.profilePicture && profileData.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6" mt={2} textAlign="center">
              {profileData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center">
              {profileData.email}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/edit-alumni-profile")}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6">About</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {profileData.about || "No information provided."}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Experience</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {profileData.experience || "No experience details available."}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Education</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {profileData.education || "No education details available."}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Skills</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {profileData.skills?.join(", ") || "No skills listed."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AlumniProfileDash;
