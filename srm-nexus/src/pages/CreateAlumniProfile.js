import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateAlumniProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    currentCompany: "",
    role: "",
    openToReferral: false,
    skills: "",
    linkedin: "",
    github: "",
    resume: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.post(
        "http://localhost:5001/alumni-profile",
        { ...formData, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile created:", response.data);
      navigate("/alumni-profile-dash");
    } catch (error) {
      console.error("Error creating profile:", error.response?.data?.error || error.message);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Alumni Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Current Company"
          name="currentCompany"
          value={formData.currentCompany}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Skills (comma-separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Resume"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Profile"}
        </Button>
      </form>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CreateAlumniProfile;