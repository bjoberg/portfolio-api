'use strict';

const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('tags', [
      {
        id: uuidv4(),
        title: 'landscape',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'urban',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'mountians',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'water',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    queryInterface.bulkInsert('groups', [{
      id: uuidv4(),
      thumbnailUrl: 'https://www.testUrl.com',
      imageUrl: 'https://www.testUrl.com',
      title: 'Natural Landscape',
      description: 'This is a group',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    return queryInterface.bulkInsert('images', [{
      id: uuidv4(),
      thumbnailUrl: 'https://www.testUrl.com',
      imageUrl: 'https://www.testUrl.com',
      title: 'Test Image',
      description: 'This is a super awesome image!',
      location: 'Chicago, IL',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('tags', null, {});
    queryInterface.bulkDelete('groups', null, {});
    return queryInterface.bulkDelete('images', null, {});
  }
};
