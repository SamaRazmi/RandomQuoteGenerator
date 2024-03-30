const CombinedModel = require('../models/CombinedModel');

const sampleData = [
  {
    name: 'Love Quotes',
    quotes: [
      {
        text: 'The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.',
        author: 'Victor Hugo',
        category: 'Love',
      },
      {
        text: 'Love all, trust a few, do wrong to none.',
        author: 'William Shakespeare',
        category: 'Love',
      },
    ],
  },
  {
    name: 'Success Quotes',
    quotes: [
      {
        text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
        author: 'Winston Churchill',
        category: 'Success',
      },
      {
        text: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
        author: 'Albert Schweitzer',
        category: 'Success',
      },
    ],
  },
  {
    name: 'Humor Quotes',
    quotes: [
      {
        text: 'I love deadlines. I love the whooshing noise they make as they go by.',
        author: 'Douglas Adams',
        category: 'Humor',
      },
      {
        text: 'Always forgive your enemies; nothing annoys them so much.',
        author: 'Oscar Wilde',
        category: 'Humor',
      },
    ],
  },
  // Add more sample data as needed
];

// Return all data from collection
const listsInDb = async () => {
  try {
    const listsInfo = await CombinedModel.find();
    return listsInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Clear collection
const clearData = async () => {
  try {
    await CombinedModel.deleteMany({});
    console.log('Data cleared successfully.');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

module.exports = {
  sampleData,
  listsInDb,
  clearData,
};
