import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5001/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        localStorage.setItem("userId", response.data.user._id);

        // ✅ Fetch Profile
        const profileResponse = await axios.get(`http://localhost:5001/profile/${response.data.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(profileResponse.data.profile);
      } catch (error) {
        console.error("Error fetching user or profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
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
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #1E1E1E 0%, #3A3A3A 100%)",
          color: "#FFD700",
          textAlign: "center",
          p: 4,
        }}
      >
        {/* ✅ Restore Animated Text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Hi, {user?.name}! 👋
          </Typography>
        </motion.div>

        {/* ✅ Restore Button Animations */}
        {profile ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">🎓 Your Profile</Typography>
            <Typography variant="body1">📧 Email: {user?.email}</Typography>
            <Typography variant="body1">📜 Skills: {profile?.skills}</Typography>
            <Typography variant="body1">📁 Resume: {profile?.resume}</Typography>
          </Box>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
                color: "#1E1E1E",
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: "10px",
                padding: "12px 24px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                "&:hover": { backgroundColor: "#FFEA70" },
              }}
              onClick={() => navigate("/create-profile")}
            >
              Create Profile
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default StudentDashboard;
