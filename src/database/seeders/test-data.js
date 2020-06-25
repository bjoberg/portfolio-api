"use strict";

const SeederHelper = require("./helpers/seederHelper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const helper = new SeederHelper(queryInterface);

      // Create users
      await helper.bulkInsertUsers();
      console.log(`✅ created ${helper.userIds.length} users`);

      // Create tags
      await helper.bulkInsertTags(10);
      console.log(`✅ created ${helper.tagIds.length} tags`);

      // Create groups
      await helper.bulkInsertGroups(4);
      console.log(`✅ created ${helper.groupIds.length} groups`);

      // Create image and save all ids in array
      await helper.bulkInsertImages(100);
      console.log(`✅ created ${helper.imageIds.length} images`);

      // Create group tags using group ids and tag ids
      await helper.bulkInsertGroupTags();
      console.log(`✅ created ${helper.groupTagIds.length} group-tag associations`);

      // Create image tags using image ids and tag ids
      await helper.bulkInsertImageTags();
      console.log(`✅ created ${helper.imageTagIds.length} image-tag associations`);

      // Create image groups using image ids and group ids
      await helper.bulkInsertImageGroups();
      console.log(`✅ created ${helper.imageGroupIds.length} image-group associations`);

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
