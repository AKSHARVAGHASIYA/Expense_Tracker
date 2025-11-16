import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "./api";
import "./Reports.css";

const Report = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
  });

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const COLORS = ["#FFD700", "#00C49F", "#FF8042", "#8884D8"];

  const loadReport = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await api.post("/reports/filter", {
        email: user.email,
        startDate: filters.startDate,
        endDate: filters.endDate,
        category: filters.category,
      });

      const data = res.data;

      setSummary({
        totalIncome: data.totalIncome,
        totalExpenses: data.totalExpenses,
      });

      setMonthlyData(data.monthlyData);
      setCategoryData(data.categoryData);
      setTableData(data.tableData);
    } catch (err) {
      console.log("❌ Report error:", err);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const exportCSV = () => {
    let csv = "Month,Category,Amount\n";
    tableData.forEach((row) => {
      csv += `${row.month},${row.category},${row.amount}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Month", "Category", "Amount"]],
      body: tableData.map((row) => [
        row.month,
        row.category,
        `Rs. ${row.amount}`,   // IMPORTANT → do NOT use ₹ symbol
      ]),

      startY: 20,

      styles: {
        fontSize: 12,
        cellPadding: 4,
        textColor: "#000",
      },

      headStyles: {
        fillColor: [41, 128, 185],
        textColor: "#fff",
        fontSize: 14,
      },

      columnStyles: {
        2: { halign: "right" },
      },
    });

    doc.save("report.pdf");
  };



  return (
    <div className="report-page">
      <h1 className="report-title">Expense Reports</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p style={{ color: "#00FF9D" }}>₹{summary.totalIncome}</p>
        </div>

        <div className="card">
          <h3>Total Expenses</h3>
          <p style={{ color: "#FF6464" }}>₹{summary.totalExpenses}</p>
        </div>

        <div className="card">
          <h3>Highest Spending Month</h3>
          <p>
            {monthlyData.length
              ? monthlyData.reduce((a, b) => (a.total > b.total ? a : b)).month
              : "N/A"}
          </p>
        </div>

        <div className="card">
          <h3>Avg Daily Spend</h3>
          <p>₹{(summary.totalExpenses / 30).toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-box">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button onClick={loadReport}>Apply</button>
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-card">
          <h3>Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="total" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
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

      {/* Table */}
      <div className="table-card">
        <h3>Detailed Report</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <td>{row.month}</td>
                <td>{row.category}</td>
                <td>₹{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
