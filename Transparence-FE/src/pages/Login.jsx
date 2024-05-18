import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
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
        <button type="submit">Login</button>
        <Link to={"/signup"}>To Sign-up</Link>
      </form>
    </>
  );
};

export default Login;
