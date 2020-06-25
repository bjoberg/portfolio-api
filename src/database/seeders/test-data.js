"use strict";

const SeederHelper = require("./helpers/seederHelper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const helper = new SeederHelper(queryInterface);

      // Create users
      await helper.bulkInsertUsers();
      console.log('created users: ', helper.userIds);

      // Create tags
      await helper.bulkInsertTags(10);
      console.log('created tags', helper.tagIds);

      // Create groups
      await helper.bulkInsertGroups(4);
      console.log('created groups', helper.groupIds);

      // TODO: Create image and save all ids in array
      await helper.bulkInsertImages(100);
      console.log('created images', helper.imageIds);

      // TODO: Create group tags using group ids and tag ids
      // await helper.createGroupTags();

      // TODO: Create image tags using image ids and tag ids
      // await helper.createImageTags();

      // TODO: Create image groups using image ids and group ids
      // return await helper.createImageGroups();
      return;
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
