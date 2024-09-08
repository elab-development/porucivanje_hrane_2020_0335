import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
const AuthForm = ({ setToken, setUser }) => {
  const [isRegistering, setIsRegistering] = useState(true); // Za prebacivanje između prijave i registracije
  const [formData, setFormData] = useState({
    name: '',
    email: 'store@example.com',
    password: 'password',
    password_confirmation: '',
    role: 'customer', // Podrazumevana uloga je 'customer'
    store_name: '',
    address: '',
    opening_hours: '',
    description: '',
    contact_number: '',
    logo_url: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isRegistering) {
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
        sessionStorage.setItem('auth_token', response.data.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.access_token);
        setUser(response.data.user);
        setSuccess('Registration successful!');
        setError(null);
        navigate('/dashboard');
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: formData.email,
          password: formData.password,
        });
        sessionStorage.setItem('auth_token', response.data.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.access_token);
        setUser(response.data.user);
        setSuccess('Login successful!');
        setError(null);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>

        {isRegistering && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isRegistering && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />

            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="store">Store</option>
              <option value="delivery_person">Delivery Person</option>
              <option value="guest">Guest</option>
            </select>

            {formData.role === 'store' && (
              <>
                <label>Store Name</label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                  required
                />
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <label>Opening Hours</label>
                <input
                  type="text"
                  name="opening_hours"
                  value={formData.opening_hours}
                  onChange={handleChange}
                  required
                />
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                />
                <label>Logo URL</label>
                <input
                  type="url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleChange}
                />
              </>
            )}
          </>
        )}

        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <p>
        {isRegistering
          ? 'Already have an account? '
          : "Don't have an account? "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
