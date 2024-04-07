import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../../API';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass: password }),
      });
      const responseData = await response.json();
      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('email', email);
        toast.success('Login Successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(responseData.msg || 'An error occurred');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/adminlogin2.jpg')` }}>
        <div className="mt-32 w-80 bg-white bg-opacity-50 rounded-md shadow-md p-8">
          <h2 className="text-black font-bold text-2xl " style={{textAlign: 'center'}}>Admin Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <img src="/petpals.png" alt="Logo" className="w-32 " />
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="email" className="text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" style={{backgroundColor: '#007bff', color: '#fff',  border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer'}}>
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
};

export default AdminLogin;