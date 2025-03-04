import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // Default to "student"
  const [error, setError] = useState("");

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });

      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.user.userType);
        localStorage.setItem("userName", data.user.name);

        alert("🎉 Login Successful!");

        // ✅ Redirect based on user type
        navigate(data.user.userType === "student" ? "/student-dashboard" : "/alumni-dashboard");
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFD700",
        overflow: "hidden",
        padding: { xs: "20px", sm: "40px 20px" },
        background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)",
        animation: "rotateBackground 20s infinite linear",
        "@keyframes rotateBackground": {
          "0%": { background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)" },
          "50%": { background: "linear-gradient(45deg, #2F3C7E, #1E1E1E, #2F3C7E)" },
          "100%": { background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)" },
        },
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />

      {/* Login Form */}
      <Box
        sx={{
          background: "rgba(30, 30, 30, 0.8)",
          borderRadius: "12px",
          padding: { xs: "20px", sm: "40px" },
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#FFD700",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          Login to SRM Nexus
        </Typography>

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#FFEA70" },
            },
            "& .MuiInputLabel-root": { color: "#FFD700" },
            "& .MuiInputBase-input": { color: "#FFD700" },
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#FFEA70" },
            },
            "& .MuiInputLabel-root": { color: "#FFD700" },
            "& .MuiInputBase-input": { color: "#FFD700" },
          }}
        />

        {/* User Type Dropdown */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: "#FFD700" }}>User Type</InputLabel>
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            label="User Type"
            sx={{
              color: "#FFD700",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFD700" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#FFEA70" },
              "& .MuiSvgIcon-root": { color: "#FFD700" },
            }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="alumni">Alumni</MenuItem>
          </Select>
        </FormControl>

        {/* Error Message */}
        {error && (
          <Typography sx={{ color: "red", mb: 2, fontSize: "0.9rem" }}>{error}</Typography>
        )}

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
            color: "#1E1E1E",
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#FFEA70" },
            boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.5)",
            padding: "12px 24px",
          }}
        >
          Login
        </Button>

        {/* Signup Link */}
        <Typography
          variant="body1"
          sx={{ mt: 3, color: "#FFD700", textShadow: "1px 1px 5px rgba(0,0,0,0.5)" }}
        >
          Don't have an account?{" "}
          <Typography
            component="span"
            sx={{ color: "cyan.300", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
