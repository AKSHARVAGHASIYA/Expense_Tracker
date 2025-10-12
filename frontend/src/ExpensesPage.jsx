import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './ExpensesPage.css'; // ✅ moved style to external CSS file

const initialExpenses = [
  { id: 1, date: "2025-10-11", description: "Groceries", category: "Food", amount: 45.90, payment: "Online" },
  { id: 2, date: "2025-10-10", description: "Bus Ticket", category: "Travel", amount: 12.00, payment: "Cash" },
  { id: 3, date: "2025-10-09", description: "Movie Tickets", category: "Entertainment", amount: 25.00, payment: "Online" },
  { id: 4, date: "2025-10-08", description: "Dinner with friends", category: "Food", amount: 75.50, payment: "Online" },
  { id: 5, date: "2025-10-07", description: "New headphones", category: "Shopping", amount: 150.00, payment: "Online" },
  { id: 6, date: "2025-10-06", description: "Electricity Bill", category: "Bills", amount: 65.20, payment: "Online" },
  { id: 7, date: "2025-10-05", description: "Coffee", category: "Food", amount: 4.50, payment: "Cash" },
  { id: 8, date: "2025-10-04", description: "Train to city", category: "Travel", amount: 22.00, payment: "Online" },
  { id: 9, date: "2025-10-03", description: "Gym Membership", category: "Health", amount: 40.00, payment: "Online" },
  { id: 10, date: "2025-10-02", description: "Book for study", category: "Education", amount: 35.00, payment: "Online" },
  { id: 11, date: "2025-10-01", description: "Internet Bill", category: "Bills", amount: 60.00, payment: "Online" },
];

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', category: 'All' });
  const [sort, setSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses
      .filter(exp => exp.description.toLowerCase().includes(filters.search.toLowerCase()))
      .filter(exp => filters.startDate ? exp.date >= filters.startDate : true)
      .filter(exp => filters.endDate ? exp.date <= filters.endDate : true)
      .filter(exp => filters.category !== 'All' ? exp.category === filters.category : true);

    return filtered.sort((a, b) => {
      if (sort === 'Newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'Oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });
  }, [expenses, filters, sort]);

  const totalPages = Math.ceil(filteredAndSortedExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredAndSortedExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="expenses-page">
      <div className="page-container">
        <div className="expenses-header">
          <h1 className="page-header" style={{ margin: 0 }}>Expenses</h1>
          <Link to="/add-expense" className="add-expense-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            Add Expense
          </Link>
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            <label>Search</label>
            <input type="text" name="search" placeholder="Search by name..." value={filters.search} onChange={handleFilterChange} />
          </div>
          <div className="filter-group">
            <label>Date</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option>All</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Education</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort</label>
            <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="apply-btn">Apply</button>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Expense List</h3>
          <table className="expense-list-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginatedExpenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>-${exp.amount.toFixed(2)}</td>
                  <td>{exp.payment}</td>
                  <td>
                    <a className="expense-action-link">Edit</a>
                    <a className="expense-action-link delete">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <div className="pagination-nav">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                &larr; Prev
              </button>
            </div>
            <div className="pagination-pages">
              {[...Array(totalPages).keys()].map(num => (
                <button key={num + 1} onClick={() => setCurrentPage(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>
                  {num + 1}
                </button>
              ))}
            </div>
            <div className="pagination-nav">
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
