const express = require('express');
const router = express.Router();
const CombinedModel = require('../models/CombinedModel');
//Get All
router.get('/lists', async (req, res) => {
  try {
    const listsWithQuotes = await CombinedModel.find().populate('quotes');
    res.json(listsWithQuotes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Add a List
router.post('/lists', async (req, res) => {
  try {
    const newList = new CombinedModel(req.body);
    const savedList = await newList.save();
    res.json(savedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit a List
router.put('/lists/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updatedList = await CombinedModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updatedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a List
router.delete('/lists/:id', async (req, res) => {
  try {
    const deletedList = await CombinedModel.findByIdAndDelete(req.params.id);
    // Also delete all related quotes
    await CombinedModel.updateMany(
      {},
      { $pull: { quotes: { _id: { $in: deletedList.quotes } } } }
    );
    res.json(deletedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a Quote Inside a List
router.post('/lists/:id/quotes', async (req, res) => {
  try {
    const list = await CombinedModel.findById(req.params.id);
    list.quotes.push(req.body);
    const savedList = await list.save();
    res.json(savedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit a Quote Inside a List
router.put('/lists/:listId/quotes/:quoteId', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    const list = await CombinedModel.findById(req.params.listId);
    const quote = list.quotes.id(req.params.quoteId);
    quote.set({ text, author, category });
    const savedList = await list.save();
    res.json(savedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Quote Inside a List
router.delete('/lists/:listId/quotes/:quoteId', async (req, res) => {
  try {
    const listId = req.params.listId;
    const quoteId = req.params.quoteId;

    // Update the list to remove the quote
    const updatedList = await CombinedModel.findByIdAndUpdate(
      listId,
      { $pull: { quotes: { _id: quoteId } } },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
