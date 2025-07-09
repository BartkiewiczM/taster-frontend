import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../AuthContext";
import "./LoginRegisterPages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await loginUser(email, password);
      setUser(result.user);
      setToken(result.token);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      navigate("/meal");
    } catch (err) {
      console.error(err);
      alert("Failed to login");
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
