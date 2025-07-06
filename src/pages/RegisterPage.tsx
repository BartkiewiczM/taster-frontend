import { useState } from "react";
import { registerUser } from "../api";
import { useAuth } from "../AuthContext";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setUser, setToken } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await registerUser(email, password, passwordConfirmation);
      setUser(result.user);
      setToken(result.token);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      alert("Registered!");
    } catch (err) {
      console.error(err);
      alert("Failed to register");
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" type="password" />
      <button type="submit">Sign up</button>
    </form>
  );
}
