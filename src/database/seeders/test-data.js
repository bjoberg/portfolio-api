'use strict';

const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [{
      id: uuidv4(),
      thumbnailUrl: 'https://www.testUrl.com',
      imageUrl: 'https://www.testUrl.com',
      title: 'Test Image',
      description: 'This is a super aweseom image!',
      location: 'Chicago, IL',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
