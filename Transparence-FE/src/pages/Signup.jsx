import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password, role);
      navigate("/dashboard");
    } catch (error) {
      console.error("ERROR SIGNING UP");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Company">Company</option>
          <option value="Applicant">Applicant</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <Link to={"/"}>To Login</Link>
    </>
  );
};

export default Signup;
