require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routers/auth');
const loginRouter = require('./routers/login');
const morgan = require('morgan');
const crudRouter = require('./config/CRUD');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow requests from your frontend React application hosted on Render
app.use(cors({ origin: 'https://randomquotegenerator-e8a5.onrender.com' }));

// Separate CORS configuration for other origins
app.use(cors());

app.use(morgan('dev'));
app.use('/api/auth', authRouter);
app.use('/api/auth', loginRouter);
app.use('/api', crudRouter); // Mount the CRUD routes under the /api prefix

// Connect to MongoDB
const mongoConnected = new Promise((resolve, reject) => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
      resolve();
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      reject(error);
    });
});

// Export both server and app
const serverPromise = mongoConnected
  .then(() => {
    return app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = {
  app,
  serverPromise,
};
