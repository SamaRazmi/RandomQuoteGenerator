const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const CombinedModel = require('../models/CombinedModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate random data
const generateRandomData = () => {
  const quotes = [];
  const categories = ['Inspiration', 'Motivation', 'Wisdom', 'Love', 'Success'];
  const authors = [
    'Unknown',
    'Steve Jobs',
    'Albert Einstein',
    'Maya Angelou',
    'Oprah Winfrey',
  ];

  for (let i = 0; i < 5; i++) {
    quotes.push({
      text: `Random quote ${i + 1}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return {
    name: `Random List ${Math.floor(Math.random() * 100)}`,
    quotes,
  };
};

// Generate 10 sets of random data
const sampleData = Array.from({ length: 10 }, () => generateRandomData());

// Bulk insert data
CombinedModel.insertMany(sampleData)
  .then((createdData) => {
    console.log('Data inserted successfully:', createdData);
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
  });
