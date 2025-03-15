import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Avatar, Grid, Divider, Button, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ProfileDashboard = () => {
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

        const response = await axios.get(`http://localhost:5001/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Backend response:", response.data); // Debugging

        // Check the structure of the response
        if (response.data.profile) {
          setProfileData(response.data.profile);
        } else {
          setError("Profile data not found.");
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error.response?.data?.error || error.message);
        setError("Failed to fetch profile data. Please try again.");
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
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#F5F7FA" }}>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#333">
          Profile Dashboard
        </Typography>

        <Grid container spacing={3}>
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
                src={profileData?.profilePicture || undefined}
              >
                {!profileData?.profilePicture && profileData?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h6" mt={2} fontWeight="bold">
                {profileData?.name || "Your Name"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profileData?.email || "your.email@example.com"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button
                variant="contained"
                onClick={() => navigate("/edit-profile")}
                sx={{ bgcolor: "#007BFF", color: "#fff", fontWeight: "bold" }}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: "12px", boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Profile Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Phone:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.phone || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Bio:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.bio || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Skills:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.skills?.join(", ") || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Education:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.education || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Experience:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.experience || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    LinkedIn:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.linkedin || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    GitHub:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.github || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Resume:
                  </Typography>
                  <Typography variant="body1">
                    {profileData?.resume || "Not provided"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileDashboard;