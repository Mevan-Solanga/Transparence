import React from "react";
import { useAuth } from "../context/auth-context";
import DashboardEmployee from "../pages/DashboardEmployee";
import DashboardEmployer from "../pages/DashboardEmployer";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return (
    <>
      {user.role === "Company" && <DashboardEmployer />}
      {user.role === "Applicant" && <DashboardEmployee />}
    </>
  );
};

export default PrivateRoutes;
