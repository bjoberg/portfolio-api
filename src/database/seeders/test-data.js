'use strict';

const SeederHelper = require('./helpers/seederHelper');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const helper = new SeederHelper(queryInterface);
      await helper.createTags();
      await helper.createGroups();
      await helper.createImages();
      await helper.createGroupTags();
      await helper.createImageTags();
      return await helper.createImageGroups();
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const helper = new SeederHelper(queryInterface);
      return await helper.deleteAll(queryInterface);
    } catch (error) {
      console.log(error);
    }
  }
};
