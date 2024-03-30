import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import '../styles/MenuBar.css';

const MenuBar = ({ user, onLogout, onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      console.log('User information retrieved from cookie:', userData);
      onLogin(userData);
    }
  }, [onLogin]);

  const handleLogout = () => {
    Cookies.remove('user'); // Remove user cookie
    onLogout(); // Call the logout function passed from the App component
    navigate('/'); // Navigate to the home page after logout
  };

  const handleQuotesClick = () => {
    if (!user) {
      // If user is not logged in, show alert and prevent navigation
      alert('You must login first.');
      return;
    }
    // If user is logged in, navigate to the Quotes page
    navigate('/quotes');
  };

  return (
    <div className="menu-bar">
      <div className="user-info">
        {user && <span>Welcome, {user.name}</span>}
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span onClick={handleQuotesClick}>Quotes</span>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {user ? (
          <li>
            <span onClick={handleLogout}>Logout</span>
          </li>
        ) : (
          <li>
            <Link to="/login">Login | Sign Up</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

MenuBar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onLogout: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default MenuBar;
