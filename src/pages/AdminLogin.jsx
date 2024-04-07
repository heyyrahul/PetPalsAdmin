import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../../API';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    height: '100vh',
    backgroundImage: 'url("/adminlogin2.jpg")',
    backgroundPosition: 'center', 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
    justifyContent: 'right',
  },
  form: {
    marginTop: theme.spacing(11),
    width: 350,
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Initial boxShadow
    transition: 'box-shadow 0.3s ease-in-out', // Add transition for smooth effect
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)', // Updated boxShadow on hover
    },
    backdropFilter: 'blur(8px)', // Add blur effect to the background
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set transparent background with alpha value
    zIndex: 100,
  },
  logo: {
    width: '30%', // Adjust the width as needed
    marginBottom: theme.spacing(2),
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    zIndex: 100,
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  error: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
}));

const AdminLogin = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const responseData = await response.json(); 
      if (response.ok) {  
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('email', email);
        toast.success('Login Successful!');
        setTimeout(() => {
          navigate('/dashboard'); 
        },1000)
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
      <Paper className={classes.formContainer} elevation={3}>
        <div className={classes.form}>
          <h2 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Arial', fontSize: '25px' }}>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <img src="/petpals.png" alt="Logo" className={classes.logo} />
            <TextField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              className={classes.input}
              fullWidth
            />
            <TextField
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              className={classes.input}
              fullWidth
            />
            <Button type="submit" variant="contained" className={classes.button}>
              Login
            </Button>
          </form>
        </div>
      </Paper>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
};

export default AdminLogin;
