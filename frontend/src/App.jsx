import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Import all your components (make sure paths are correct)
import './App.css';
import Navbar from './Navbar.jsx';
import HomePage from './HomePage.jsx';
import ExpensesPage from './ExpensesPage.jsx';
import Report from './Reports.jsx';
import About from './About.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';


function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;