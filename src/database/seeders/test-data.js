"use strict";

const SeederHelper = require("./helpers/seederHelper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const helper = new SeederHelper(queryInterface);

      // TODO: Create users and save user ids in array
      // await helper.createUsers();

      // TODO: Create tags and save all ids in array
      // await helper.createTags();

      // TODO: Create groups and save all ids in array
      // await helper.createGroups();

      // TODO: Create image and save all ids in array
      return await helper.createImages();

      // TODO: Create group tags using group ids and tag ids
      // await helper.createGroupTags();

      // TODO: Create image tags using image ids and tag ids
      // await helper.createImageTags();

      // TODO: Create image groups using image ids and group ids
      // return await helper.createImageGroups();
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
