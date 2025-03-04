import axios from "axios";

const API_BASE_URL = "http://localhost:5001"; // Backend URL

// Signup API
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Signup failed" };
  }
};

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Login failed" };
  }
};
