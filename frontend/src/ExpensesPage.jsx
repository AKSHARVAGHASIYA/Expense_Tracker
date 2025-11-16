import React, { useState, useEffect } from "react";
import "./ExpensesPage.css";
import api from "./api"; // Axios instance

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [editIncomeId, setEditIncomeId] = useState(null);

  const [newExpense, setNewExpense] = useState({
    date: "",
    amount: "",
    category: "Food",
    description: "",
    payment: "Cash",
  });

  const [newIncome, setNewIncome] = useState({
    date: "",
    amount: "",
    source: "",
    description: "",
    payment: "Cash",
  });

  // 🧩 Fetch both expenses and incomes
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const encodedEmail = encodeURIComponent(user.email);
        const [expRes, incRes] = await Promise.all([
          api.get(`/expenses/${encodedEmail}`),
          api.get(`/incomes/${encodedEmail}`),
        ]);

        setExpenses(expRes.data);
        setIncomes(incRes.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredExpenses =
    filteredCategory === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filteredCategory);

  // 🧮 Summary Calculations
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const cashIncome = incomes.filter((i) => i.payment === "Cash").reduce((s, i) => s + i.amount, 0);
  const onlineIncome = incomes.filter((i) => i.payment === "Online").reduce((s, i) => s + i.amount, 0);
  const cashExpense = expenses.filter((e) => e.payment === "Cash").reduce((s, e) => s + e.amount, 0);
  const onlineExpense = expenses.filter((e) => e.payment === "Online").reduce((s, e) => s + e.amount, 0);
  const cashBalance = cashIncome - cashExpense;
  const onlineBalance = onlineIncome - onlineExpense;
  const balance = totalIncome - totalExpense;

  // 🧩 Add / Edit Expense
  const handleAddOrEditExpense = async () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description) {
      alert("Please fill all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    try {
      if (isEditing) {
        const { data } = await api.put(`/expenses/update/${editId}`, newExpense);
        alert("✅ Expense updated successfully!");
        setExpenses((prev) =>
          prev.map((exp) => (exp._id === editId ? data.expense : exp))
        );
      } else {
        const expenseData = {
          userEmail: user.email,
          date: newExpense.date,
          amount: parseFloat(newExpense.amount),
          category: newExpense.category,
          description: newExpense.description,
          payment: newExpense.payment,
        };
        const { data } = await api.post("/expenses/add", expenseData);
        alert("✅ Expense added successfully!");
        setExpenses((prev) => [...prev, data.expense]);
      }

      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      setNewExpense({
        date: "",
        amount: "",
        category: "Food",
        description: "",
        payment: "Cash",
      });
    } catch (error) {
      console.error("❌ Error adding/updating expense:", error);
      alert("⚠️ Something went wrong while saving expense.");
    }
  };

  // 🧩 Add / Edit Income
  const handleAddIncome = async () => {
    if (!newIncome.date || !newIncome.amount || !newIncome.source) {
      alert("Please fill all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    try {
      if (isEditingIncome) {
        const { data } = await api.put(`/incomes/update/${editIncomeId}`, newIncome);
        alert("✅ Income updated successfully!");
        setIncomes((prev) =>
          prev.map((inc) => (inc._id === editIncomeId ? data.income : inc))
        );
      } else {
        const incomeData = {
          userEmail: user.email,
          date: newIncome.date,
          amount: parseFloat(newIncome.amount),
          source: newIncome.source,
          description: newIncome.description,
          payment: newIncome.payment,
        };
        const { data } = await api.post("/incomes/add", incomeData);
        alert("✅ Income added successfully!");
        setIncomes((prev) => [...prev, data.income]);
      }

      setShowIncomeForm(false);
      setIsEditingIncome(false);
      setEditIncomeId(null);
      setNewIncome({
        date: "",
        amount: "",
        source: "",
        description: "",
        payment: "Cash",
      });
    } catch (error) {
      console.error("❌ Error adding/updating income:", error);
      alert("⚠️ Something went wrong while saving income.");
    }
  };

  // 🧩 Delete handlers
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await api.delete(`/expenses/delete/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      alert("✅ Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;
    try {
      await api.delete(`/incomes/delete/${id}`);
      setIncomes((prev) => prev.filter((i) => i._id !== id));
      alert("✅ Income deleted successfully!");
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  // 🧩 Edit setup
  const handleEdit = (exp) => {
    setNewExpense(exp);
    setIsEditing(true);
    setEditId(exp._id);
    setShowForm(true);
  };

  const handleEditIncome = (inc) => {
    setNewIncome(inc);
    setIsEditingIncome(true);
    setEditIncomeId(inc._id);
    setShowIncomeForm(true);
  };

  return (
    <div className="expenses-page fade-in">
      <div className="page-container">
        {/* 💹 Financial Overview */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 215, 0, 0.4)",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "40px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h2
            style={{
              color: "#FFD700",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "1.4rem",
            }}
          >
            💹 Financial Overview
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255, 215, 0, 0.1)" }}>
                <th>Category</th>
                <th>Cash</th>
                <th>Online</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "#00FF88", fontWeight: "600" }}>Income</td>
                <td>₹{cashIncome.toFixed(2)}</td>
                <td>₹{onlineIncome.toFixed(2)}</td>
                <td>₹{totalIncome.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ color: "#FF5555", fontWeight: "600" }}>Expense</td>
                <td>₹{cashExpense.toFixed(2)}</td>
                <td>₹{onlineExpense.toFixed(2)}</td>
                <td>₹{totalExpense.toFixed(2)}</td>
              </tr>
              <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                <td style={{ color: "#FFD700", fontWeight: "700" }}>
                  Balance Available
                </td>
                <td style={{ color: cashBalance >= 0 ? "#00FF88" : "#FF5555" }}>
                  ₹{cashBalance.toFixed(2)}
                </td>
                <td style={{ color: onlineBalance >= 0 ? "#00FF88" : "#FF5555" }}>
                  ₹{onlineBalance.toFixed(2)}
                </td>
                <td style={{ color: balance >= 0 ? "#00FF88" : "#FF5555" }}>
                  ₹{balance.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Header Buttons */}
        <div className="expenses-header">
          <h1 className="page-header">Expenses & Incomes</h1>
          <div>
            <button className="add-expense-btn" onClick={() => setShowForm(true)}>
              + Add Expense
            </button>
            <button className="add-expense-btn" onClick={() => setShowIncomeForm(true)}>
              + Add Income
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        {/* Expense Table */}
        <div className="card">
          <h2>Expenses</h2>
          <table className="expense-list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length ? (
                filteredExpenses.map((exp) => (
                  <tr key={exp._id}>
                    <td>{exp.date}</td>
                    <td style={{ color: "#ffd700" }}>₹{exp.amount.toFixed(2)}</td>
                    <td>{exp.category}</td>
                    <td>{exp.description}</td>
                    <td>{exp.payment}</td>
                    <td>
                      <button className="table-btn edit" onClick={() => handleEdit(exp)}>
                        Edit
                      </button>
                      <button className="table-btn delete" onClick={() => handleDelete(exp._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: "center" }}>No expenses yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Income Table */}
        <div className="card" style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#FFD700" }}>Incomes</h2>
          <table className="expense-list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Source</th>
                <th>Description</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.length ? (
                incomes.map((inc) => (
                  <tr key={inc._id}>
                    <td>{inc.date}</td>
                    <td style={{ color: "#00ff88" }}>₹{inc.amount.toFixed(2)}</td>
                    <td>{inc.source}</td>
                    <td>{inc.description}</td>
                    <td>{inc.payment}</td>
                    <td>
                      <button className="table-btn edit" onClick={() => handleEditIncome(inc)}>Edit</button>
                      <button className="table-btn delete" onClick={() => handleDeleteIncome(inc._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: "center" }}>No incomes yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Expense Modal */}
        {showForm && (
          <div className="overlay">
            <div className="modal fade-in">
              <h2>{isEditing ? "Edit Expense" : "Add Expense"}</h2>
              <div className="form-group"><label>Date</label>
                <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
              </div>
              <div className="form-group"><label>Amount</label>
                <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
              </div>
              <div className="form-group"><label>Category</label>
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <div className="form-group"><label>Description</label>
                <input type="text" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
              </div>
              <div className="form-group"><label>Payment</label>
                <select value={newExpense.payment} onChange={(e) => setNewExpense({ ...newExpense, payment: e.target.value })}>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="button-row">
                <button className="submit-btn" onClick={handleAddOrEditExpense}>{isEditing ? "Update" : "Add"}</button>
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Income Modal */}
        {showIncomeForm && (
          <div className="overlay">
            <div className="modal fade-in">
              <h2>{isEditingIncome ? "Edit Income" : "Add Income"}</h2>
              <div className="form-group"><label>Date</label>
                <input type="date" value={newIncome.date} onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })} />
              </div>
              <div className="form-group"><label>Amount</label>
                <input type="number" value={newIncome.amount} onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })} />
              </div>
              <div className="form-group"><label>Source</label>
                <input type="text" value={newIncome.source} onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })} placeholder="e.g., Salary, Bonus" />
              </div>
              <div className="form-group"><label>Description</label>
                <input type="text" value={newIncome.description} onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })} />
              </div>
              <div className="form-group"><label>Payment</label>
                <select value={newIncome.payment} onChange={(e) => setNewIncome({ ...newIncome, payment: e.target.value })}>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="button-row">
                <button className="submit-btn" onClick={handleAddIncome}>{isEditingIncome ? "Update" : "Add"}</button>
                <button className="cancel-btn" onClick={() => setShowIncomeForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
