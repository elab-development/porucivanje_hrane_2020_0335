import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ProductsTable from './ProductsTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('auth_token');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar token={token} user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/auth" element={<AuthForm setToken={setToken} setUser={setUser} />} />
      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
