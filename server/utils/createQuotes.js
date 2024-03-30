const Quote = require('../models/Quote.js');
const Author = require('../models/Author.js');
const Category = require('../models/Category.js');

async function createQuotes() {
  try {
    const author1 = await Author.findOne({ name: 'Author 1' });
    const author2 = await Author.findOne({ name: 'Author 2' });
    const author3 = await Author.findOne({ name: 'Author 3' });

    const category1 = await Category.findOne({ name: 'Category 1' });
    const category2 = await Category.findOne({ name: 'Category 2' });
    const category3 = await Category.findOne({ name: 'Category 3' });

    const quote1 = await Quote.create({
      text: 'Quote 1',
      author: author1,
      category: category1,
    });
    const quote2 = await Quote.create({
      text: 'Quote 2',
      author: author2,
      category: category2,
    });
    const quote3 = await Quote.create({
      text: 'Quote 3',
      author: author3,
      category: category3,
    });

    console.log('Quotes created successfully:', quote1, quote2, quote3);
  } catch (error) {
    console.error('Error creating quotes:', error);
  }
}

module.exports = createQuotes;
