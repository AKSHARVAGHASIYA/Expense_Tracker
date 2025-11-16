import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const encodedEmail = encodeURIComponent(user.email);
        const [expRes, incRes] = await Promise.all([
          fetch(`http://localhost:8080/api/expenses/${encodedEmail}`),
          fetch(`http://localhost:8080/api/incomes/${encodedEmail}`),
        ]);

        const expData = await expRes.json();
        const incData = await incRes.json();

        setExpenses(expData);
        setIncomes(incData);

        // Category breakdown
        const categoryTotals = expData.reduce((acc, exp) => {
          acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
          return acc;
        }, {});
        setCategoryStats(categoryTotals);

        // Last 15 days data
        const last15Days = [...Array(15)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (14 - i));
          const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          const dateStr = date.toISOString().split("T")[0];

          // Accept both "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm:ss.sssZ"
          const total = expData
            .filter((e) => {
              if (!e.date) return false;
              return e.date.startsWith(dateStr);
            })
            .reduce((sum, e) => sum + e.amount, 0);

          return { date: formatted, amount: total };
        });
        console.log("Bar chart data:", last15Days, "Expenses:", expData);
        setBarChartData(last15Days);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Food: "#3498db",
      Travel: "#f39c12",
      Shopping: "#9b59b6",
      Entertainment: "#e74c3c",
      Health: "#27ae60",
      Bills: "#f1c40f",
      Other: "#95a5a6",
    };
    return colors[category] || "#999";
  };

  // Totals
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const thisMonthIncome = incomes
    .filter((i) => new Date(i.date).getMonth() === new Date().getMonth())
    .reduce((s, i) => s + i.amount, 0);
  const thisMonthExpense = expenses
    .filter((e) => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((s, e) => s + e.amount, 0);
  const thisWeekExpense = expenses
    .filter((e) => (new Date() - new Date(e.date)) / (1000 * 60 * 60 * 24) <= 7)
    .reduce((s, e) => s + e.amount, 0);

  const maxExpense = Math.max(...barChartData.map((d) => d.amount || 0), 1);

  return (
    <div className="home-page fade-in">
      <h1 className="page-header">📊 Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-title">This Month Income</p>
          <p className="stat-value">₹{thisMonthIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">Total Balance</p>
          <p className="stat-value">₹{balance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">This Month Spend</p>
          <p className="stat-value">₹{thisMonthExpense.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">This Week Spend</p>
          <p className="stat-value">₹{thisWeekExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        {/* Spending Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Spending Over Time (Last 15 Days)</h3>
          <div className="bar-chart">
            {barChartData.map((bar, i) => (
              <div className="bar-item" key={i}>
                <div
                  className="bar animated-bar"
                  style={{
                    height: bar.amount === 0
                      ? '8px'
                      : `${Math.max((bar.amount / maxExpense) * 220, 8)}px`,
                  }}
                  title={`₹${bar.amount.toFixed(2)}`}
                ></div>
                <span className="bar-date">{bar.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="chart-card">
          <h3 className="chart-title">Category Breakdown</h3>
          {Object.keys(categoryStats).length ? (
            <>
              <div
                className="doughnut-chart"
                style={{
                  background: `conic-gradient(${Object.entries(categoryStats)
                    .map(([cat, val], idx, arr) => {
                      const total = Object.values(categoryStats).reduce(
                        (a, b) => a + b,
                        0
                      );
                      const start = arr
                        .slice(0, idx)
                        .reduce((a, [_, v]) => a + (v / total) * 100, 0);
                      const end = start + (val / total) * 100;
                      return `${getCategoryColor(cat)} ${start.toFixed(
                        1
                      )}% ${end.toFixed(1)}%`;
                    })
                    .join(", ")})`,
                }}
              ></div>
              <ul className="legend">
                {Object.entries(categoryStats).map(([cat, amt], i) => (
                  <li className="legend-item" key={i}>
                    <span
                      className="legend-color"
                      style={{ backgroundColor: getCategoryColor(cat) }}
                    ></span>
                    {cat} — ₹{amt.toFixed(2)}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="recent-expenses">
        <h3 className="table-title">Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p className="no-data">No recent expenses</p>
        ) : (
          <table className="expense-list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((e) => (
                  <tr key={e._id}>
                    <td>{e.date}</td>
                    <td>{e.description}</td>
                    <td>{e.category}</td>
                    <td className="amount-cell">-₹{e.amount.toFixed(2)}</td>
                    <td
                      style={{
                        color: e.payment === "Cash" ? "#00ff88" : "#3498db",
                      }}
                    >
                      {e.payment}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomePage;
