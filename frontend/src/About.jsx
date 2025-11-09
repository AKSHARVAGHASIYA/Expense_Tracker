import React from "react";

const About = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>About Us</h1>

      <p style={styles.intro}>
        Welcome to <span style={styles.brand}>Expense Tracker</span> — your
        all-in-one tool to record, manage, and analyze your daily expenses
        efficiently.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🎯 Our Mission</h2>
          <p style={styles.cardText}>
            We aim to help individuals and small businesses take control of
            their finances through simple, visual, and interactive tools —
            making expense tracking effortless and insightful.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🚀 Our Vision</h2>
          <p style={styles.cardText}>
            To create a smarter way to manage money by combining technology,
            simplicity, and design — empowering users to make better financial
            decisions.
          </p>
        </div>
      </div>

      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>💡 Key Features</h2>
        <ul style={styles.featureList}>
          <li>Easy-to-use expense input and editing</li>
          <li>Automatic calculation of total spend</li>
          <li>Dynamic report charts using Recharts</li>
          <li>Responsive design for all devices</li>
          <li>Secure and local data storage</li>
        </ul>
      </div>

      <div style={styles.team}>
        <h2 style={styles.sectionTitle}>👥 Meet the Team</h2>
        <p style={styles.cardText}>
          Built by passionate web developers who believe that managing finances
          should be easy, transparent, and stress-free.
        </p>
      </div>

      <div style={styles.footer}>
        © {new Date().getFullYear()} Expense Tracker | All Rights Reserved
      </div>
    </div>
  );
};

// 🎨 Same dark theme and font as the Reports page
const styles = {
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#1e1e2f", // dark background
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontFamily: "Poppins, sans-serif",
    color: "#f1f1f1",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    textAlign: "center",
    color: "#ffd700", // gold accent
    marginBottom: "24px",
  },
  intro: {
    color: "#d1d5db",
    fontSize: "18px",
    textAlign: "center",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  brand: {
    fontWeight: "600",
    color: "#00bcd4", // cyan accent
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "24px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: "10px",
  },
  cardText: {
    color: "#d1d5db",
    lineHeight: "1.7",
    fontSize: "16px",
  },
  features: {
    marginTop: "40px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: "16px",
  },
  featureList: {
    listStyleType: "disc",
    listStylePosition: "inside",
    color: "#cbd5e1",
    textAlign: "left",
    margin: "0 auto",
    maxWidth: "500px",
    lineHeight: "1.8",
  },
  team: {
    marginTop: "40px",
    textAlign: "center",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "12px",
  },
};

export default About;