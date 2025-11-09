import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const Report = () => {
  const monthlyData = [
    { month: "Jan", total: 1200 },
    { month: "Feb", total: 900 },
    { month: "Mar", total: 1400 },
    { month: "Apr", total: 1000 },
    { month: "May", total: 1600 },
  ];

  const categoryData = [
    { name: "Food", value: 1200 },
    { name: "Travel", value: 800 },
    { name: "Shopping", value: 600 },
    { name: "Bills", value: 400 },
  ];

  const COLORS = ["#FFD700", "#00C49F", "#FF8042", "#8884D8"];

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const exportCSV = () => alert("Export to CSV feature coming soon!");
  const exportPDF = () => alert("Export to PDF feature coming soon!");

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
      padding: "40px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "5px",
      color: "#FFD700",
    },
    subtitle: {
      textAlign: "center",
      marginBottom: "40px",
      color: "#aaa",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "50px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "14px",
      textAlign: "center",
      padding: "20px",
      boxShadow: "0 0 15px rgba(255, 215, 0, 0.05)",
    },
    cardTitle: { fontSize: "14px", color: "#bbb" },
    cardValue: { fontSize: "24px", fontWeight: "600", marginTop: "6px" },
    filtersBox: {
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "14px",
      padding: "20px",
      marginBottom: "50px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "20px",
    },
    input: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      background: "#222",
      color: "#fff",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      color: "#fff",
    },
    blueBtn: { background: "#3182CE" },
    redBtn: { background: "#E53E3E" },
    chartGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "40px",
      marginBottom: "50px",
    },
    chartBox: {
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "14px",
      padding: "20px",
    },
    chartTitle: {
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "600",
      color: "#FFD700",
      marginBottom: "10px",
    },
    tableBox: {
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "14px",
      padding: "20px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#fff",
    },
    th: {
      background: "#222",
      padding: "12px",
      border: "1px solid #333",
    },
    td: {
      padding: "10px",
      border: "1px solid #333",
      textAlign: "center",
    },
    insights: {
      marginTop: "30px",
      background: "rgba(255, 215, 0, 0.1)",
      borderLeft: "4px solid #FFD700",
      padding: "15px 20px",
      borderRadius: "10px",
      color: "#FFD700",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Expense Reports</h1>
      <p style={styles.subtitle}>
        View insights and summaries of your spending patterns.
      </p>

      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Income</h3>
          <p style={{ ...styles.cardValue, color: "#00FF9D" }}>₹10,000</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Expenses</h3>
          <p style={{ ...styles.cardValue, color: "#FF6464" }}>₹5,200</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Highest Spending Month</h3>
          <p style={styles.cardValue}>May — ₹1,600</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Average Daily Spend</h3>
          <p style={styles.cardValue}>₹173</p>
        </div>
      </div>

      <div style={styles.filtersBox}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <label>Start Date</label><br />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>
          <div>
            <label>End Date</label><br />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>
          <div>
            <label>Category</label><br />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              style={styles.input}
            >
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ ...styles.button, ...styles.blueBtn }} onClick={exportCSV}>
            Export CSV
          </button>
          <button style={{ ...styles.button, ...styles.redBtn }} onClick={exportPDF}>
            Export PDF
          </button>
        </div>
      </div>

      <div style={styles.chartGrid}>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="total" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.tableBox}>
        <h3 style={styles.chartTitle}>Detailed Report</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Month</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Total Amount</th>
              <th style={styles.th}>% of Total Spend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>May</td>
              <td style={styles.td}>Food</td>
              <td style={styles.td}>₹1200</td>
              <td style={styles.td}>40%</td>
            </tr>
            <tr>
              <td style={styles.td}>May</td>
              <td style={styles.td}>Travel</td>
              <td style={styles.td}>₹600</td>
              <td style={styles.td}>20%</td>
            </tr>
            <tr>
              <td style={styles.td}>May</td>
              <td style={styles.td}>Shopping</td>
              <td style={styles.td}>₹1000</td>
              <td style={styles.td}>33%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.insights}>
        <p>🧠 You spent 25% more on Food this month compared to last month.</p>
        <p>📈 Your total expenses increased by ₹400 compared to April.</p>
      </div>
    </div>
  );
};

export default Report;