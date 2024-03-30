const Author = require('../models/Author.js');

async function createAuthors() {
  try {
    const author1 = await Author.create({
      name: 'Author 1',
      bio: 'Bio of Author 1',
    });
    const author2 = await Author.create({
      name: 'Author 2',
      bio: 'Bio of Author 2',
    });
    const author3 = await Author.create({
      name: 'Author 3',
      bio: 'Bio of Author 3',
    });

    console.log('Authors created successfully:', author1, author2, author3);
  } catch (error) {
    console.error('Error creating authors:', error);
  }
}

module.exports = crea - teAuthors;
