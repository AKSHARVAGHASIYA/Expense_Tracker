import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🧩 Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🧩 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-container">
        <span className="logo">Expense Tracker</span>

        {/* Navigation links */}
        <Link to="/">Home</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/about">About</Link>

        <div className="nav-buttons">
          {user ? (
            <>
              <span className="welcome-text">👋 Hi, {user.name}</span>
              <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="nav-btn nav-btn-accent">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
