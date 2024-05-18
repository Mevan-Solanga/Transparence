import { useAuth } from "../context/auth-context";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password, role);
      router.push("/"); // Navigate to dashboard after signup
    } catch (error) {
      console.error("ERROR SIGNING UP");
    }
  };

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
      <option value="Company">Doctor</option>
      <option value="Applicant">Patient</option>
    </select>
    <button type="submit">Sign Up</button>
  </form>;
};

export default Signup;
