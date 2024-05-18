import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [walletID, setWalletID] = useState("");
  const [role, setRole] = useState("");
  const { signup } = useAuth();

  console.log(walletID);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password, role, walletID, companyName);
      navigate("/dashboard");
    } catch (error) {
      console.error("ERROR SIGNING UP");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <input
          type="text"
          value={walletID}
          onChange={(e) => setWalletID(e.target.value)}
          required
          placeholder="Wallet ID"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{ width: "calc(100% - 22px)" }} // Adjusted width to match other input boxes
        >
          <option value="0">Select Role</option>
          <option value="Company">Company</option>
          <option value="Applicant">Applicant</option>
        </select>
        {role === "Company" && (
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Company Name"
          />
        )}
        <button type="submit">Sign Up</button>
        <Link to={"/"}>Login</Link>
      </form>
    </>
  );
};

export default Signup;
