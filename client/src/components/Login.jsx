import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      // Sending request to local address
      const localResponse = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: username, password }),
        }
      );

      const localData = await localResponse.json();

      if (localResponse.ok) {
        // Save user info in cookie upon successful login
        Cookies.set('user', JSON.stringify(localData.user));
        console.log('User information saved in cookie:', localData.user); // Log user info
        onLogin(localData.user);
        navigate('/');
        return; // Exiting the function to prevent further execution
      } else {
        alert(localData.message);
      }

      // Sending request to external address
      const externalResponse = await fetch(
        'https://crandomquotegenerator.onrender.com/api/auth/login'
      );
      const externalData = await externalResponse.json();
      console.log('Quote from external API:', externalData);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again later.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <button type="button" onClick={handleCreateAccount}>
              Create New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
