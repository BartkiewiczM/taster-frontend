import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar__left">
        <Link to={user ? "/meal" : "/login"} className="navbar__logo">
          🍽️ Taster
        </Link>
      </div>

      <nav className="navbar__right">
        {user ? (
          <>
            <span className="navbar__user">{user.email}</span>
            <Link to="/meal" className="navbar__link">Random Meal</Link>
            <button className="navbar__button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
