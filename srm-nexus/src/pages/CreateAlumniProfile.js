import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAlumniProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    currentCompany: "",
    role: "",
    skills: "",
    linkedin: "",
    github: "",
    resume: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5001/alumni-profile", { ...formData, userId }, {
        headers: { Authorization: `Bearer ${token}` },
    });


      alert("Profile Created Successfully!");
      navigate("/alumni-profile-dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="h4" mb={3}>Create Alumni Profile</Typography>

      {error && <Typography color="red">{error}</Typography>}

      <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Bio" name="bio" fullWidth margin="normal" onChange={handleChange} multiline rows={3} />
      <TextField label="Current Company" name="currentCompany" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Role" name="role" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Skills (comma separated)" name="skills" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="LinkedIn" name="linkedin" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="GitHub" name="github" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Resume (URL)" name="resume" fullWidth margin="normal" onChange={handleChange} />

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Create Profile</Button>
    </Box>
  );
};

export default CreateAlumniProfile;
