import React from "react";
import { useAuth } from "../context/auth-context"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DashboardApplicant = () => {
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
      <h1>Dashboard Applicant</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardApplicant;
