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
    <div>
      <h1>Employer Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <p>{notification.message}</p>
          <button onClick={() => handleAction(notification.id)}>
            Take Action
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmployerDashboard;
