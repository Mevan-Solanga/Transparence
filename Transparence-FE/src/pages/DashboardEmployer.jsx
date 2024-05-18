import React from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const DashboardApplicant = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
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
