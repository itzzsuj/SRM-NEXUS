import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./landing/main";
import Login from "./login";
import Signup from "./signup";
import StudentDashboard from "./pages/StudentDashboard";
import CreateProfile from "./pages/CreateProfile";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
