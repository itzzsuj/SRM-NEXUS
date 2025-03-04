import React from "react";
import { Box, Typography, Container, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)", // Dark Charcoal Gradient
        color: "#FFD700", // Bright Yellow Text
        py: 4,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Footer Branding */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          SRM Nexus
        </Typography>

        {/* Quick Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }}>
          <Link href="/about" color="inherit" underline="hover">
            About
          </Link>
          <Link href="/contact" color="inherit" underline="hover">
            Contact
          </Link>
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#FFD700" }}>
            <Facebook />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#FFD700" }}>
            <Twitter />
          </IconButton>
          <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#FFD700" }}>
            <LinkedIn />
          </IconButton>
          <IconButton href="https://github.com" target="_blank" sx={{ color: "#FFD700" }}>
            <GitHub />
          </IconButton>
        </Box>

        {/* Copyright Notice */}
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} SRM Nexus. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
