import React, { useState } from 'react';
import "../styles/AdminLogin.css";
import URL from '../../API';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass: password })
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful
        localStorage.setItem('token', data.token);
        console.log(data);
        navigate('/dashboard'); // Use navigate function instead of history.push
      } else {
        setError(data.msg || 'An error occurred');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred');
    }
  };

  return (
    <div id='adminloginparent'>
      <div className="admin-login-container">
        <h2><strong>Admin Login</strong></h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div>
            <label htmlFor="email">Email</label> <br />
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-login-input" placeholder='Enter your email' />
          </div>
          <div>
            <label htmlFor="password">Password</label> <br />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-login-input" placeholder='Enter your password' />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
          {error && <p className="admin-login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
