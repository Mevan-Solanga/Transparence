import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardEmployee from "./pages/DashboardEmployee";
import DashboardEmployer from "./pages/DashboardEmployer";
import { AuthProvider } from "./context/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboardApplicant",
    element: <DashboardEmployee />,
  },
  {
    path: "/dashboardEmplyer",
    element: <DashboardEmployer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
