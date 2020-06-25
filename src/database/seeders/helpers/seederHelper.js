"use strict";

const uuidv4 = require("uuid/v4");

/**
 * Get random number between provided min and max.
 * 
 * @param {number} min minimum possivle value of random number
 * @param {number} max maximum possible valud of random number
 * @returns {number}
 */
const randomIntFromInterval = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = class SeederHelper {
  constructor(queryInterface) {
    this.queryInterface = queryInterface;
    this.userIds = [];
    this.tagIds = [];
    this.groupIds = [];
    this.imageIds = [];
    this.imageGroupIds = [];
    this.groupTagIds = [];
    this.imageTagIds = [];
  }

  /**
   * Delete all data from every table in the db
   */
  async deleteAll() {
    await this.queryInterface.bulkDelete("users", null, {});
    await this.queryInterface.bulkDelete("imageGroups", null, {});
    await this.queryInterface.bulkDelete("groupTags", null, {});
    await this.queryInterface.bulkDelete("imageTags", null, {});
    await this.queryInterface.bulkDelete("tags", null, {});
    await this.queryInterface.bulkDelete("groups", null, {});
    await this.queryInterface.bulkDelete("images", null, {});
  }

  // TODO: DELETE THIS FUNCTION
  async getIdByTitle(table, title) {
    const id = await this.queryInterface.sequelize.query(
      `SELECT id from "${table}"
      WHERE title='${title}';`
    );
    return id[0][0].id;
  }

  /**
   * Bulk insert users into the db.
   */
  bulkInsertUsers() {
    const id = uuidv4();
    this.userIds = [id];
    return this.queryInterface.bulkInsert(
      "users",
      [
        {
          id,
          googleId: "105501578802074596671",
          email: "brett.oberg8@gmail.com",
          firstName: "Brett",
          lastName: "Oberg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  }

  /**
   * Create a new tag.
   * 
   * @param {string} tagName Name of the new tag
   * @returns {object}
   */
  createTag(tagName) {
    const id = uuidv4();
    const title = `tag: ${tagName}`;
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, title, createdAt, updatedAt
    }
  }

  /**
   * Bulk insert tags into the db.
   * 
   * @param {number} numTags Number of tags to create and insert
   */
  bulkInsertTags(numTags) {
    const tags = [];
    for (let i = 0; i < numTags; i += 1) {
      const tag = this.createTag(i);
      tags.push(tag);
      this.tagIds.push(tag.id);
    }
    return this.queryInterface.bulkInsert("tags", tags, {});
  }

  /**
   * Create a new group.
   * 
   * @param {string} groupName Name of the new group
   * @returns {object}
   */
  createGroup(groupName) {
    const id = uuidv4();
    const width = randomIntFromInterval(100, 1000);
    const height = randomIntFromInterval(100, 1000);
    const thumbnailUrl = `https://picsum.photos/${width}/${height}`;
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    const title = `Group ${groupName}`;
    const description = `This is super awesome group ${groupName}!`;
    const createdAt = new Date();
    const updatedAt = new Date();
    return { id, thumbnailUrl, imageUrl, title, description, createdAt, updatedAt };
  }

  /**
   * Bulk insert groups into the db.
   * 
   * @param {number} numGroups Number of groups to create and insert
   */
  bulkInsertGroups(numGroups) {
    const groups = [];
    for (let i = 0; i < numGroups; i += 1) {
      const group = this.createGroup(i);
      groups.push(group);
      this.groupIds.push(group.id);
    }
    return this.queryInterface.bulkInsert("groups", groups, {});
  }

  /**
   * Create a new image.
   * 
   * @param {string} imageName Name of the new image
   * @returns {object}
   */
  createImage(imageName) {
    const id = uuidv4();
    const width = randomIntFromInterval(100, 1000);
    const height = randomIntFromInterval(100, 1000);
    const thumbnailUrl = `https://picsum.photos/${width}/${height}`;
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    const title = `Test Image ${imageName}`;
    const description = `This is super awesome image ${id}!`;
    const location = "";
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, width, height, thumbnailUrl, imageUrl, title, description, location, createdAt, updatedAt
    }
  }

  /**
   * Bulk insert images into the db.
   * 
   * @param {number} numImages Number of images to create and insert
   */
  bulkInsertImages(numImages) {
    const images = [];
    for (let i = 0; i < numImages; i += 1) {
      const image = this.createImage(i);
      images.push(image);
      this.imageIds.push(image.id);
    }
    return this.queryInterface.bulkInsert("images", images, {});
  }

  /**
   * Create a new image group.
   * 
   * @param {string} imageId id of the image to associate to group
   * @param {string} groupId id of the group to associate to image
   * @returns {object}
   */
  createImageGroup(imageId, groupId) {
    const id = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, imageId, groupId, createdAt, updatedAt
    }
  }

  /**
   * Bulk insert image groups into the db.
   */
  bulkInsertImageGroups() {
    const imageGroups = [];
    this.imageIds.forEach(id => {
      const randGroupIndex = randomIntFromInterval(0, this.groupIds.length - 1);
      const groupId = this.groupIds[randGroupIndex];
      const imageGroup = this.createImageGroup(id, groupId);
      imageGroups.push(imageGroup);
      this.imageGroupIds.push(imageGroup.id);
    });

    return this.queryInterface.bulkInsert("imageGroups", imageGroups, {});
  }

  /**
   * Create a new group tag.
   * 
   * @param {string} groupId id of the group to associate to tag
   * @param {string} tagId id of the tag to associate to group
   * @returns {object}
   */
  createGroupTag(groupId, tagId) {
    const id = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, groupId, tagId, createdAt, updatedAt
    }
  }

  /**
   * Bulk insert group tags into the db.
   */
  bulkInsertGroupTags() {
    const groupTags = [];
    this.groupIds.forEach(id => {
      const randTagIndex = randomIntFromInterval(0, this.tagIds.length - 1);
      const tagId = this.tagIds[randTagIndex];
      const groupTag = this.createGroupTag(id, tagId);
      groupTags.push(groupTag);
      this.groupTagIds.push(groupTag.id);
    });

    return this.queryInterface.bulkInsert("groupTags", groupTags, {});
  }

  /**
   * Create a new image tag.
   * 
   * @param {string} imageId id of the image to associate to tag
   * @param {string} tagId id of the tag to associate to image
   * @returns {object}
   */
  createImageTag(imageId, tagId) {
    const id = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, imageId, tagId, createdAt, updatedAt
    }
  }

  /**
   * Bulk insert image tags into the db.
   */
  bulkInsertImageTags() {
    const imageTags = [];
    this.imageIds.forEach(id => {
      const randTagIndex = randomIntFromInterval(0, this.tagIds.length - 1);
      const tagId = this.tagIds[randTagIndex];
      const imageTag = this.createImageTag(id, tagId);
      imageTags.push(imageTag);
      this.imageTagIds.push(imageTag.id);
    });

    return this.queryInterface.bulkInsert("imageTags", imageTags, {});
  }
};
