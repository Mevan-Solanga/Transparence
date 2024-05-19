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

const EmployerDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        // Fetch the employer's company name from the user's document
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        if (userData && userData.companyName) {
          setCompanyName(userData.companyName);
        } else {
          console.error("Company name not found for the user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCompanyName();
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

  const handleAction = (notificationId) => {
    // Placeholder for future action logic
    console.log(`Action triggered for notification ID: ${notificationId}`);
  };

  return (
    <div className="dashboard-container">
      <form className="dashboard-form">
        <h1>Employer Portal</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="notifications-container">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <p className="message">{notification.message}</p>
              <button
                className="action-button"
                onClick={() => handleAction(notification.id)}
              >
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
