import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./api" // Import API function

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");

  // Validate Email
  const isValidEmail = (email) => {
    return userType === "student"
      ? /^[a-zA-Z0-9._%+-]+@srmist\.edu\.in$/.test(email)
      : email.length > 5;
  };

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      setError(
        userType === "student"
          ? "Students must use an @srmist.edu.in email."
          : "Enter a valid email."
      );
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setError("");
  
    try {
      // Send data to backend
      const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, userType }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Show success message instead of immediate redirect
        alert(`🎉 ${userType} successfully signed up!`);
  
        // 🔄 Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error || "Signup failed.");
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
      {/* Overlay for Readability */}
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

      {/* Signup Form */}
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
            mb: 3,
            color: "#FFD700",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          Create an Account
        </Typography>

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

        {/* Name Field */}
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* Referral Code (Optional) */}
        <TextField
          fullWidth
          label="Referral Code (Optional)"
          variant="outlined"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Error Message */}
        {error && (
          <Typography sx={{ color: "red", mb: 2, fontSize: "0.9rem" }}>{error}</Typography>
        )}

        {/* Signup Button */}
        <Button fullWidth variant="contained" onClick={handleSignup}>
          Sign Up
        </Button>

        {/* Login Link */}
        <Typography>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
