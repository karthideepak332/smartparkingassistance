// src/App.js
import React from 'react';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './Admin';
import User from './User';
import Login from './Login';
import Signup from './Signup';
import Home from './Home'; // Import Home Component
import './App.css';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <nav className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/user">User</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/home">Home</Link> {/* Corrected link */}
            </nav>
        </header>
    );
}

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} /> {/* Corrected Home route */}
            </Routes>
        </Router>
    );
};

export default App;
