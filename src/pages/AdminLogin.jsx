import React, { useState } from 'react';
import "../styles/AdminLogin.css";
import URL from '../../API';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        console.log(data);
        // console.log({email, password});
        const email2 = localStorage.getItem('email');
    if (email2) {
        console.log(email2);
    }
        navigate('/dashboard'); 
      } else {
        setError(data.msg || 'An error occurred');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred');
    }
  };

  return (
    <div id='adminloginparent' >
      <div className="admin-login-container" style={{backgroundColor:"#F7EEDD" ,boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
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
          <button type="submit" className="admin-login-button" >Login</button>
          {error && <p className="admin-login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
