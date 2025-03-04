import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 250, bgcolor: "#1E1E1E", color: "#FFD700", height: "100vh", p: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
        Dashboard
      </Typography>
      <List>
        <ListItemButton onClick={() => navigate("/student-dashboard")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#FFD700" }} />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/create-profile")}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "#FFD700" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "#FFD700" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/logout")}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#FFD700" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
