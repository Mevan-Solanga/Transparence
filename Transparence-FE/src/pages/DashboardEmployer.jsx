import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import "../styles/employeer.css";

// Import NEAR functions
import { initializeNear, confirmVerificationRequest, getAccountId } from '../api/near';

const EmployerDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [employerWalletId, setEmployerWalletId] = useState("");
  const [contractInitialized, setContractInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeNear();
      setContractInitialized(true);
    };

    initialize();
  }, []);

  useEffect(() => {
    const fetchCompanyNameAndWalletId = async () => {
      try {
        // Fetch the employer's company name and wallet ID from the user's document
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        if (userData) {
          setCompanyName(userData.companyName);
          setEmployerWalletId(userData.walletID);
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCompanyNameAndWalletId();
  }, [user.uid]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user.uid) {
        return;
      }

      try {
        // Query notifications for the employer's company
        const q = query(
          collection(db, "notifications"),
          where("companyId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const notificationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [companyName]);

  console.log(notifications);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAction = async (employeeWalletId) => {
    try {
      if (contractInitialized) {
        await confirmVerificationRequest(employeeWalletId, employerWalletId);
        console.log(`Verification request confirmed for applicant: ${employeeWalletId}`);
      } else {
        console.error("Contract not initialized");
      }
    } catch (error) {
      console.error("Error confirming verification request:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <form className="dashboard-form">
        <h1>Employer Portal</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="notifications-container">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <p className="message">{notification.message}</p>
              <button className="action-button" onClick={() => handleAction(notification.employeeWalletId)}>
                Take Action
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default EmployerDashboard;
