import React from "react";
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-wrapper"> 
            <nav className="navbar-container">
              {/* Left side items */}
              <span className="logo">Expense Tracker</span>
              <a href="/">Home</a>
              <a href="/expenses">Expenses</a>
              <a href="/reports">Reports</a>
              <a href="/about">About</a>
  
              {/* This div is the key. The 'margin-left: auto' pushes it to the right. */}
              <div className="nav-buttons">
                  {/* I've added a class to the login button for individual styling if needed */}
                  <button className="nav-btn">Login</button>
                  {/* The accent button stands out */}
                  <button className="nav-btn nav-btn-accent">Sign Up</button>
              </div>
            </nav>
        </div>
    );
};
export default Navbar;