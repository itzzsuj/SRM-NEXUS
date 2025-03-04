import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false); // Close drawer on mobile
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#1E1E1E" }}> {/* Dark Charcoal Background */}
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFD700" }}>
            SRM NEXUS
          </Typography>

          {/* Desktop Links */}
          <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
            <Button sx={{ color: "#FFD700", "&:hover": { color: "#FFEA70" } }} onClick={() => scrollToSection("home")}>Home</Button>
            <Button sx={{ color: "#FFD700", "&:hover": { color: "#FFEA70" } }} onClick={() => scrollToSection("about")}>About</Button>
            <Button sx={{ color: "#FFD700", "&:hover": { color: "#FFEA70" } }} onClick={() => scrollToSection("contact")}>Contact</Button>
            <Button 
              variant="contained" 
              sx={{
                background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
                color: "#1E1E1E",
                "&:hover": { backgroundColor: "#FFEA70" }
              }} 
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { md: "none" } }}>
            <MenuIcon sx={{ color: "#FFD700" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250, backgroundColor: "#1E1E1E", height: "100vh" }}>
          <ListItem button onClick={() => scrollToSection("home")}>
            <ListItemText primary="Home" sx={{ color: "#FFD700" }} />
          </ListItem>
          <ListItem button onClick={() => scrollToSection("about")}>
            <ListItemText primary="About" sx={{ color: "#FFD700" }} />
          </ListItem>
          <ListItem button onClick={() => scrollToSection("contact")}>
            <ListItemText primary="Contact" sx={{ color: "#FFD700" }} />
          </ListItem>
          <ListItem button onClick={() => navigate("/login")}>
            <ListItemText primary="Login" sx={{ color: "#FFD700" }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
