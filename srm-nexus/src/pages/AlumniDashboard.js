import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box, Typography } from "@mui/material";

const AlumniDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:5001/alumni/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.profile) {
          setHasProfile(true);
        }
      } catch (error) {
        console.error("Error checking alumni profile:", error);
      }
      setLoading(false);
    };

    checkProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Redirect based on profile existence
  if (hasProfile) {
    navigate("/alumni-profile-dashboard");
  } else {
    navigate("/create-alumni-profile");
  }

  return null;
};

export default AlumniDashboard;
