const Category = require('../models/Category.js');

async function createCategories() {
  try {
    const category1 = await Category.create({
      name: 'Category 1',
    });
    const category2 = await Category.create({
      name: 'Category 2',
    });
    const category3 = await Category.create({
      name: 'Category 3',
    });

    console.log(
      'Categories created successfully:',
      category1,
      category2,
      category3
    );
  } catch (error) {
    console.error('Error creating categories:', error);
  }
}

module.exports = createCategories;
