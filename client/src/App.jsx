import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import { store } from './Quotes/store';
import MainContainer from './components/MainContainer';
import Contact from './components/Contact';
import Login from './components/Login';
import QuoteListManager from './Quotes/QuoteListManager';
import './App.css';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <MenuBar user={user} onLogout={handleLogout} onLogin={handleLogin} />
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/quotes" element={<QuoteListManager />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
