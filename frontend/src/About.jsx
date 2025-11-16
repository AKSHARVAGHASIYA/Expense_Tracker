import React from "react";

const About = () => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.title}>About Expense Tracker</h1>
      <p style={styles.subtitle}>
        A modern way to manage, visualize, and understand your finances.
      </p>

      {/* MISSION + VISION */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🎯 Our Mission</h2>
          <p style={styles.cardText}>
            To simplify financial management by providing a clean, intuitive,
            and powerful tool that helps you track expenses effortlessly and
            make smarter financial decisions.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🚀 Our Vision</h2>
          <p style={styles.cardText}>
            To empower every individual with insights, clarity, and control
            over their money — all through elegant UI and smart analytics.
          </p>
        </div>
      </div>

      {/* FEATURE HIGHLIGHTS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 What Makes Us Unique?</h2>

        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>📊 Smart Reports</h3>
            <p style={styles.featureText}>
              Visualize monthly and category spending with beautifully designed
              charts powered by Recharts.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>💰 Track Income + Expense</h3>
            <p style={styles.featureText}>
              Manage both income and expenses with real-time balance insights.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>⚡ Fast & Responsive</h3>
            <p style={styles.featureText}>
              Built with React, Node.js, and MongoDB for a seamless and
              responsive experience.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>🛡 Secure Data</h3>
            <p style={styles.featureText}>
              Your financial data is stored safely and protected from
              unauthorized access.
            </p>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>👥 Who We Are</h2>
        <p style={styles.cardText}>
          Expense Tracker was developed by dedicated and passionate web
          developers who believe financial clarity should be simple, elegant,
          and accessible for everyone.
        </p>

        <div style={styles.teamBadge}>
          <span>💻 Full Stack Developers</span>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © {new Date().getFullYear()} Expense Tracker — Built with ❤️ and Code
      </div>
    </div>
  );
};

/* 🎨 Stylish dark theme + gold UI */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "40px",
    background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    fontFamily: "Poppins, sans-serif",
    color: "#e5e5e5",
    border: "1px solid rgba(255,215,0,0.15)",
  },

  title: {
    fontSize: "38px",
    fontWeight: "700",
    textAlign: "center",
    color: "#FFD700",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#bbbbbb",
    textAlign: "center",
    marginBottom: "40px",
  },

  /* Mission + Vision Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid rgba(255,215,0,0.1)",
    backdropFilter: "blur(6px)",
    transition: "0.3s",
  },

  cardTitle: {
    color: "#FFD700",
    fontSize: "22px",
    marginBottom: "10px",
  },

  cardText: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#cccccc",
  },

  /* Feature Section */
  section: {
    marginTop: "50px",
  },

  sectionTitle: {
    fontSize: "26px",
    textAlign: "center",
    fontWeight: "600",
    color: "#FFD700",
    marginBottom: "20px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  featureCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,215,0,0.1)",
    padding: "20px",
    borderRadius: "14px",
    transition: "0.3s",
  },

  featureTitle: {
    color: "#00E0A8",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  featureText: {
    fontSize: "15px",
    color: "#d5d5d5",
  },

  /* Team Section */
  teamBadge: {
    marginTop: "20px",
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "25px",
    background: "rgba(255,215,0,0.1)",
    border: "1px solid rgba(255,215,0,0.3)",
    fontWeight: "600",
    color: "#FFD700",
  },

  /* Footer */
  footer: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "14px",
    color: "#aaaaaa",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
};

export default About;
