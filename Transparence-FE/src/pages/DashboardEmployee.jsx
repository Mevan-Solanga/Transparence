import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const DashboardEmployee = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "companies"));
        const companiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companiesList);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  console.log(companies);

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
      {companies.map((e) => (
        <div>{e.companyName}</div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardEmployee;
