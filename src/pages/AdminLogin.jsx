import React, { useState } from 'react';
import "../styles/AdminLogin.css";
const AdminLogin = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://rich-gray-lovebird-tux.cyclic.app/users');
      const data = await response.json();
      const admin = data.user.find(user => user.username === username && user.pass === password && user.role === 'admin');
      if (admin) {
        // Redirect to admin dashboard
        history.push('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div id='adminloginparent' >
      <div className="admin-login-container">
      <h2 ><strong>Admin Login</strong></h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div>
          <label htmlFor="username">Username</label> <br />
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-login-input" placeholder='Enter your username'/>
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
