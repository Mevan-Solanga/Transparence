import React from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DashboardEmployee = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Navigate to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard Employee</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardEmployee;
