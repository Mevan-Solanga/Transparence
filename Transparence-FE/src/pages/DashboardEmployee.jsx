import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../styles/employee.css";
const DashboardEmployee = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [message, setMessage] = useState("");

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("Please select a company.");
      return;
    }

    try {
      await addDoc(collection(db, "notifications"), {
        companyId: selectedCompany,
        message,
        from: user.uid,
        createdAt: new Date(),
      });
      alert("Notification sent successfully.");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Employee Portal</h1>
        <label htmlFor="company">Select Company:</label>
        <select
          id="company"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          required
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <br />

        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <br />
        <button type="submit">Send Notification</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default DashboardEmployee;
