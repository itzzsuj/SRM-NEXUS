import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlumniProfileDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:5001/alumni-profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching alumni profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box textAlign="center">
        <Typography variant="h5">No profile found. Please create one.</Typography>
        <Button variant="contained" onClick={() => navigate("/create-alumni-profile")}>
          Create Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Welcome, {profile.name}!</Typography>

      <Typography><strong>Email:</strong> {profile.email}</Typography>
      <Typography><strong>Phone:</strong> {profile.phone}</Typography>
      <Typography><strong>Bio:</strong> {profile.bio}</Typography>
      <Typography><strong>Company:</strong> {profile.currentCompany}</Typography>
      <Typography><strong>Role:</strong> {profile.role}</Typography>
      <Typography><strong>Skills:</strong> {profile.skills.join(", ")}</Typography>
      <Typography><strong>LinkedIn:</strong> <a href={profile.linkedin} target="_blank">View Profile</a></Typography>
      <Typography><strong>GitHub:</strong> <a href={profile.github} target="_blank">View Profile</a></Typography>

      <Button variant="contained" onClick={() => navigate("/edit-alumni-profile")} sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default AlumniProfileDashboard;
