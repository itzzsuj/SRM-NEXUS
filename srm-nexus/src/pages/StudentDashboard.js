import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Box } from "@mui/material";

const StudentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Decode the token to get the userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Fetch the profile data
        const profileResponse = await axios.get(`http://localhost:5001/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Profile response:", profileResponse.data); // Debugging

        if (profileResponse.data.profile) {
          // If profile exists, redirect to ProfileDashboard
          navigate("/profile-dashboard");
        } else {
          // If profile doesn't exist, redirect to CreateProfile
          navigate("/create-profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/create-profile"); // Fallback to CreateProfile if there's an error
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default StudentDashboard;