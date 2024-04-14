import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const userData = {
      name,
      family,
      email,
      password,
    };

    try {
      // Sending request to local address
      const localResponse = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (localResponse.ok) {
        // Registration successful, navigate to login page
        navigate('/login');
        return; // Exiting the function to prevent further execution
      } else {
        // Registration failed
        const localData = await localResponse.json();
        alert(localData.message); // Display error message
      }

      // Sending request to external address
      const externalResponse = await fetch(
        'https://crandomquotegenerator.onrender.com/api/auth/register',
        {
          method: 'POST', // Assuming the external API accepts POST requests
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (externalResponse.ok) {
        // Handle successful response from external API if needed
      } else {
        // Handle failed response from external API if needed
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again later.'); // Display generic error message
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="family">Family:</label>
            <input
              type="text"
              id="family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              placeholder="Enter your family name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
