import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./landing/main";
import Login from "./login";
import Signup from "./signup";
import StudentDashboard from "./pages/StudentDashboard";
import CreateProfile from "./pages/CreateProfile";
import ProfileDashboard from "./pages/ProfileDashboard";
import EditProfile from "./pages/EditProfile";
import AlumniDashboard from "./pages/AlumniDashboard";
import CreateAlumniProfile from "./pages/CreateAlumniProfile";
import AlumniProfileDashboard from "./pages/AlumniProfileDashboard";
import "./App.css"; // Ensure styles are correctly imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile-dashboard" element={<ProfileDashboard/>}/>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/create-alumni-profile" element={<CreateAlumniProfile />} />
        <Route path="/alumni-profile-dashboard" element={<AlumniProfileDashboard />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
