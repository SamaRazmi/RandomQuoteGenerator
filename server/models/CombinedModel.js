const mongoose = require('mongoose');

const combinedSchema = new mongoose.Schema({
  name: String, // Name of the list
  quotes: [
    {
      text: String, // Quote text
      author: String, // Author name
      category: String, // Category name
    },
  ],
});

const CombinedModel = mongoose.model('CombinedModel', combinedSchema);

module.exports = CombinedModel;
