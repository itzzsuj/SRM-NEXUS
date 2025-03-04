import React, { useState } from "react";
import RotatingText from "../components/RotatingText";
import { Box, Typography, Button, Container, Modal, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import srm from "../images/Srmseal.png";
import PixelTransition from "../components/PixelTransition"; // Import the PixelTransition component

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left", // Align text to the left
        color: "#FFD700", // Bright Yellow Text
        overflow: "hidden",
        background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)", // Initial gradient
        animation: "rotateBackground 20s infinite linear", // Rotating background animation
        "@keyframes rotateBackground": {
          "0%": { background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)" },
          "50%": { background: "linear-gradient(45deg, #2F3C7E, #1E1E1E, #2F3C7E)" },
          "100%": { background: "linear-gradient(45deg, #1E1E1E, #2F3C7E, #1E1E1E)" },
        },
      }}
    >
      {/* Overlay to Improve Readability */}
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

      {/* Flexbox Container for Content */}
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          padding: { xs: "20px", sm: "40px" },
        }}
      >
        {/* Left Side: Text Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Rotating Text Box (Fixed Size) */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: "#FFD700",
              color: "black",
              borderRadius: "10px",
              fontSize: { xs: "1rem", sm: "1.3rem" },
              fontWeight: "bold",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.6)", // Adds subtle glowing effect
              width: "fit-content", // Ensures it doesn't stretch too much
            }}
          >
            <RotatingText
              texts={[
                "Empowering Alumni Networks",
                "Connecting Students to Mentors",
                "Building Bridges for Success",
                "Creating Opportunities Together",
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

          {/* Header Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", sm: "4rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)", // Subtle shadow for readability
            }}
          >
            Welcome to SRM Nexus
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              maxWidth: "600px",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              opacity: 0.9,
              textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
            }}
          >
            Connecting alumni & students with opportunities, mentorship, and growth.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
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
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#FFD700",
                color: "#FFD700",
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: "10px",
                "&:hover": { borderColor: "#FFEA70", color: "#FFEA70" },
                padding: "12px 24px",
              }}
              onClick={handleOpenModal} // Open modal on click
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Right Side: SRM Logo with PixelTransition (Medium Size) */}
        <Box
          sx={{
            width: "200px", // Medium-sized logo
            height: "200px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <PixelTransition
            firstContent={
              <img
                src={srm}
                alt="SRM Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            }
            secondContent={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "#111",
                }}
              >
                <p style={{ fontWeight: 900, fontSize: "1.2rem", color: "#ffffff", textAlign: "center" }}>
                  Welcome to SRM Nexus!
                </p>
              </div>
            }
            gridSize={12}
            pixelColor="#ffffff"
            animationStepDuration={0.4}
            className="custom-pixel-card"
          />
        </Box>
      </Container>

      {/* Modal for Learn More */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="learn-more-modal"
        aria-describedby="learn-more-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: { xs: "90%", sm: "500px" },
            padding: 3,
            borderRadius: "10px",
            backgroundColor: "#1E1E1E",
            color: "#FFD700",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Why SRM Nexus?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            SRM Nexus is a dedicated platform for SRM alumni and students to connect, collaborate, and grow together. Here are some benefits over LinkedIn:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>Focused on SRM community</li>
            <li>Tailored mentorship programs</li>
            <li>Exclusive job opportunities</li>
            <li>Simplified networking</li>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
              color: "#1E1E1E",
              fontWeight: "bold",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#FFEA70" },
            }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}