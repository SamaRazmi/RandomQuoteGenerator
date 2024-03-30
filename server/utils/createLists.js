const List = require('../models/List.js');
const Quote = require('../models/Quote.js');

async function createLists() {
  try {
    const quote1 = await Quote.findOne({ text: 'Quote 1' });
    const quote2 = await Quote.findOne({ text: 'Quote 2' });
    const quote3 = await Quote.findOne({ text: 'Quote 3' });

    const list1 = await List.create({
      name: 'List 1',
      quotes: [quote1, quote2],
    });
    const list2 = await List.create({
      name: 'List 2',
      quotes: [quote2, quote3],
    });

    console.log('Lists created successfully:', list1, list2);
  } catch (error) {
    console.error('Error creating lists:', error);
  }
}

module.exports = createLists;
