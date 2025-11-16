import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // ✅ Save logged-in user to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(`✅ ${data.message}`);
        window.location.href = "/"; // redirect to homepage
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to your Expense Tracker account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.footerText}>
            Don’t have an account?{" "}
            <a href="/signup" style={styles.link}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

// 🎨 Styling
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    color: "#f5f5f5",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    padding: "40px 50px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    border: "1px solid rgba(255, 215, 0, 0.4)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#FFD700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    textAlign: "left",
    fontSize: "0.9rem",
    color: "#ddd",
    marginBottom: "-10px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.4)",
    color: "#fff",
    outline: "none",
  },
  button: {
    background: "linear-gradient(90deg, #FFD700, #FFA500)",
    border: "none",
    color: "#1a1a1a",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
  },
  link: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: "600",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "0.9rem",
    color: "#ccc",
  },
};

export default LoginPage;
