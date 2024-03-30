const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const databaseURL = process.env.MONGODB_URI;

const client = new MongoClient(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testConnection = async () => {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  } finally {
    await client.close();
  }
};

testConnection();

module.exports = client;
