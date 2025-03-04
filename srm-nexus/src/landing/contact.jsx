import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFD700", // Bright Yellow Text
        overflow: "hidden",
        padding: { xs: "20px", sm: "40px 20px" },
        background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)", // Dark Charcoal + Blue Gradient
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
          background: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          zIndex: 0,
        }}
      />

      {/* Contact Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", sm: "4rem" },
          zIndex: 1,
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          mb: 3,
        }}
      >
        Contact 
      </Typography>

      {/* Contact Form */}
      <Container
        sx={{
          background: "rgba(255, 215, 0, 0.1)", // Light Yellow Transparent
          borderRadius: "12px",
          padding: { xs: "20px", sm: "40px" },
          maxWidth: "600px",
          boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
          zIndex: 1,
          mb: 6,
        }}
      >
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#FFD700" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#FFEA70" },
              "&.Mui-focused fieldset": { borderColor: "#FFEA70" },
            },
            mb: 2,
          }}
        />

        <TextField
          fullWidth
          label="Your Email"
          type="email"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#FFD700" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#FFEA70" },
              "&.Mui-focused fieldset": { borderColor: "#FFEA70" },
            },
            mb: 2,
          }}
        />

        <TextField
          fullWidth
          label="Your Message"
          multiline
          rows={4}
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#FFD700" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#FFEA70" },
              "&.Mui-focused fieldset": { borderColor: "#FFEA70" },
            },
            mb: 3,
          }}
        />

        <Button
          fullWidth
          variant="contained"
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
          Send Message
        </Button>
      </Container>
    </Box>
  );
}
