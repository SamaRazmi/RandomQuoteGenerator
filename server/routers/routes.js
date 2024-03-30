const express = require('express');
const router = express.Router();

// Define your endpoints
router.get('/endpoint1', (req, res) => {
  res.send('Endpoint 1 response');
});

router.post('/endpoint2', (req, res) => {
  // Access request body using req.body
  res.json(req.body);
});

module.exports = router;
