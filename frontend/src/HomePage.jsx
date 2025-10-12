import React, { useState } from 'react';

// All the styles for this component are included here.
const HomePageStyles = `
/* Using the same consistent color scheme */
:root {
  --navbar-bg: #2c3e50;
  --navbar-text: #ecf0f1;
  --accent-color: #3498db; /* Changed to a nice blue for the dashboard */
  --accent-green: #27ae60;
  --page-bg: #f4f7f9; /* A slightly cooler background */
  --text-color: #34495e;
  --shadow-color: rgba(0, 0, 0, 0.07);
  --border-color: #e1e8ed;
  --card-bg: #ffffff;
}

.homepage-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
}

/* --- Main Dashboard Grid Layout --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* --- General Card Styling --- */
.dashboard-card {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.card-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
}

.card-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--navbar-bg);
}

/* --- Sizing for Grid Items --- */
.summary-card {
    grid-column: span 1;
}
.spending-over-time-card {
    grid-column: span 3;
    height: 350px;
}
.category-breakdown-card {
    grid-column: span 1;
    height: 350px;
}
.recent-expenses-card {
    grid-column: span 4;
}

/* --- Chart Placeholders --- */
.bar-chart-placeholder {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 80%;
    width: 100%;
}

.bar {
    width: 4%;
    background-color: var(--accent-color);
    border-radius: 4px 4px 0 0;
    animation: bar-grow 1s ease-out forwards;
}

@keyframes bar-grow {
    from { height: 0; }
}

.doughnut-chart-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 2rem auto;
    background: conic-gradient(
        var(--accent-color) 0% 60%, 
        var(--accent-green) 60% 100%
    );
    position: relative;
}
.doughnut-chart-placeholder::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: var(--card-bg);
    border-radius: 50%;
}

.legend {
    list-style: none;
    padding: 0;
    text-align: center;
}
.legend-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}
.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
}


/* --- Recent Expenses Table --- */
.expenses-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}
.expenses-table th, .expenses-table td {
    padding: 0.85rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}
.expenses-table th {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #7f8c8d;
    font-weight: 600;
}
.expenses-table td {
    font-size: 0.95rem;
}
.amount-cell {
    color: #c0392b; /* Red for expenses */
}

.actions-cell a {
    color: var(--accent-color);
    text-decoration: none;
    margin-right: 10px;
}
.actions-cell a:hover {
    text-decoration: underline;
}

`;

const HomePage = () => {
    // Placeholder data for recent expenses
    const [recentExpenses, setRecentExpenses] = useState([
        { id: 1, date: '2025-10-11', description: 'Groceries', category: 'Food', amount: 45.90, payment: 'Online' },
        { id: 2, date: '2025-10-10', description: 'Bus Ticket', category: 'Travel', amount: 12.00, payment: 'Cash' },
    ]);

    // Placeholder data for bar chart heights
    const barChartData = [60, 40, 75, 50, 85, 55, 90, 70, 45, 80, 30, 70, 60, 40, 50];

    return (
        <>
            <style>{HomePageStyles}</style>
            <div className="homepage-container">
                <div className="dashboard-grid">
                    {/* --- Summary Cards --- */}
                    <div className="dashboard-card summary-card">
                        <h3 className="card-title">Total Balance</h3>
                        <p className="card-value">₹----</p>
                    </div>
                    <div className="dashboard-card summary-card">
                        <h3 className="card-title">This Month Spend</h3>
                        <p className="card-value">₹----</p>
                    </div>
                    <div className="dashboard-card summary-card">
                        <h3 className="card-title">This Week Spend</h3>
                        <p className="card-value">₹----</p>
                    </div>
                    <div className="dashboard-card summary-card">
                        <h3 className="card-title">Remaining Budget</h3>
                        <p className="card-value">₹----</p>
                    </div>

                    {/* --- Spending Over Time Chart --- */}
                    <div className="dashboard-card spending-over-time-card">
                        <h3 className="card-title">Spending Over Time (15 Bars)</h3>
                        <div className="bar-chart-placeholder">
                            {barChartData.map((height, index) => (
                                <div key={index} className="bar" style={{ height: `${height}%` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* --- Category Breakdown Chart --- */}
                    <div className="dashboard-card category-breakdown-card">
                        <h3 className="card-title">Category Breakdown</h3>
                        <div className="doughnut-chart-placeholder"></div>
                        <ul className="legend">
                            <li className="legend-item"><span className="legend-color" style={{backgroundColor: 'var(--accent-color)'}}></span>Food — 60%</li>
                            <li className="legend-item"><span className="legend-color" style={{backgroundColor: 'var(--accent-green)'}}></span>Travel — 40%</li>
                        </ul>
                    </div>
                    
                    {/* --- Recent Expenses Table --- */}
                    <div className="dashboard-card recent-expenses-card">
                        <h3 className="card-title">Recent Expenses</h3>
                        <table className="expenses-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Payment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentExpenses.map(expense => (
                                    <tr key={expense.id}>
                                        <td>{expense.date}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.category}</td>
                                        <td className="amount-cell">-₹{expense.amount.toFixed(2)}</td>
                                        <td>{expense.payment}</td>
                                        <td className="actions-cell">
                                            <a href="#">Edit</a>
                                            <a href="#">Delete</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
};

export default HomePage;
