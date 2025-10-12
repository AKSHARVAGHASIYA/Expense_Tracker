import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Import your page components ---
// Make sure the file paths are correct based on your project structure.
import Navbar from './Navbar.jsx';
import HomePage from './HomePage.jsx';
import ExpensesPage from './ExpensesPage.jsx';

// --- Simple placeholder components for the other pages ---
// You can replace these with your actual page components later.
const ReportsPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>Reports Page</h1><p>Content for reports will go here.</p></div>;
const AboutPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>About Page</h1><p>Information about the app will go here.</p></div>;
const LoginPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>Login Page</h1><p>Login form will go here.</p></div>;
const SignUpPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>Sign Up Page</h1><p>Sign up form will go here.</p></div>;


function App() {
  return (
    <BrowserRouter>
      {/* The Navbar will appear on every page because it's outside the <Routes> */}
      <Navbar />
      
      {/* The Routes component decides which page component to show based on the URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

