const supertest = require('supertest');
const helper = require('./test_helper');
const { app, serverPromise } = require('../server');
const api = supertest(app);
const Lists = require('../models/CombinedModel');

beforeEach(async () => {
  await helper.clearData();
  for (const data of helper.sampleData) {
    await Lists.create(data);
  }
}, 50000);

describe('POST /api/lists', () => {
  test('It should store a new post', (done) => {
    console.log('Starting the POST test...');
    api
      .post('/api/lists')
      .send({ name: 'fvsdvdsvdsv dsv sdv dsv List' })
      .then((res) => {
        console.log('Received POST response:', res.status);
        expect(res.status).toBe(200);
        console.log('Response body:', res.body);
        expect(res.body._id).toBeTruthy();
        console.log('POST Test completed successfully!');
        done();
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        done(error);
      });
  }, 10000);
});

describe('GET /api/lists', () => {
  test('It should retrieve a list of items', (done) => {
    console.log('Starting the GET test...');
    api
      .get('/api/lists')
      .then((res) => {
        console.log('Received GET response:', res.status);
        expect(res.status).toBe(200);
        console.log('Response body:', res.body);
        // Add more assertions based on your response body if needed
        console.log('GET Test completed successfully!');
        done();
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        done(error);
      });
  }, 10000);
});

afterAll(async () => {
  // Closes connection after all tests run
  const server = await serverPromise;
  await Lists.db.close(); // Close the MongoDB connection used by Lists model
  server.close();
});
