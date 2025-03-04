import React from "react";
import { Box, Typography, List, ListItem, Container } from "@mui/material";
import RotatingText from "../components/RotatingText";

const About = () => {
  return (
    <Box
      id="about"
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
        background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)",
        animation: "rotateBackground 20s infinite linear", // Animated gradient
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

      {/* Rotating Highlighted Text */}
      <Box
        sx={{
          px: 4,
          py: 2,
          bgcolor: "#FFD700",
          color: "black",
          borderRadius: "12px",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          fontWeight: "bold",
          overflow: "hidden",
          zIndex: 1,
          mb: 6,
          boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.6)", // Adds subtle glowing effect
        }}
      >
        <RotatingText
          texts={[
            "Connecting Alumni & Students",
            "Unlocking Career Opportunities",
            "A Thriving Professional Network",
            "Building the Future Together",
          ]}
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2500}
        />
      </Box>

      {/* About Title */}
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
        About{" "}
      </Typography>

      {/* About Description */}
      <Typography
        variant="h5"
        sx={{
          maxWidth: "800px",
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          zIndex: 1,
          opacity: 0.9,
          textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
          mb: 4,
        }}
      >
        SRM Nexus is a dynamic{" "}
        <strong>Alumni & Student Management System</strong> designed to{" "}
        <strong>bridge the gap between students, alumni, and the university</strong>.
        Whether you're looking for <strong>mentorship, career opportunities, or a way to stay connected</strong>, SRM Nexus is your{" "}
        <strong>go-to platform</strong>.
      </Typography>

      {/* Why Choose SRM Nexus */}
      <Container
        sx={{
          background: "rgba(255, 215, 0, 0.1)",
          borderRadius: "12px",
          padding: { xs: "20px", sm: "40px" },
          maxWidth: "800px",
          boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
          zIndex: 1,
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 3, color: "cyan.300" }}
        >
          Why Choose SRM Nexus?
        </Typography>
        <List
          sx={{
            textAlign: "left",
            fontSize: "1.2rem",
            color: "white",
            "& .MuiListItem-root": {
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            },
          }}
        >
          <ListItem>
            ✔ <strong>Exclusive Alumni Network</strong> - Connect with thousands of alumni worldwide.
          </ListItem>
          <ListItem>
            ✔ <strong>Career Opportunities</strong> - Find jobs, internships, and mentorship.
          </ListItem>
          <ListItem>
            ✔ <strong>University Events & Updates</strong> - Stay engaged with the latest happenings.
          </ListItem>
          <ListItem>
            ✔ <strong>Personalized Recommendations</strong> - Get tailored opportunities based on your profile.
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default About;