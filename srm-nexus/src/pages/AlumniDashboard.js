import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AlumniDashboard = () => {
  const navigate = useNavigate();
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

        console.log("Decoded token:", decodedToken); // Debugging
        console.log("Extracted userId:", userId); // Debugging

        // Fetch the alumni profile data
        const response = await axios.get(`http://localhost:5001/alumni-profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Alumni profile response:", response.data); // Debugging

        // Check if profile exists
        if (response.data.profile) {
          navigate("/alumni-profile-dash");
        } else {
          navigate("/create-alumni-profile");
        }
      } catch (error) {
        console.error("❌ Error fetching alumni profile:", error.response?.data?.error || error.message);
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

  return null; // No need to render anything, as navigation is handled above
};

export default AlumniDashboard;