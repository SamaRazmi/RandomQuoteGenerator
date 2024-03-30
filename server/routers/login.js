const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Define a secret key for JWT
const secretKey = 'ListQuotes';

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    console.log('Login request received with username:', name);

    const user = await User.findOne({ name });

    if (!user) {
      console.error('User not found for username:', name);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error('Invalid password for user:', name);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If username and password are valid, generate JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, secretKey, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    console.log('User logged in successfully:', name);
    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name },
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
