"use strict";

const uuidv4 = require("uuid/v4");

module.exports = class SeederHelper {
  constructor(queryInterface) {
    this.queryInterface = queryInterface;
    this.userIds = [];
    this.tagIds = [];
    this.groupIds = [];
  }

  async deleteAll() {
    await this.queryInterface.bulkDelete("users", null, {});
    await this.queryInterface.bulkDelete("imageGroups", null, {});
    await this.queryInterface.bulkDelete("groupTags", null, {});
    await this.queryInterface.bulkDelete("imageTags", null, {});
    await this.queryInterface.bulkDelete("tags", null, {});
    await this.queryInterface.bulkDelete("groups", null, {});
    await this.queryInterface.bulkDelete("images", null, {});
  }

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
   * @returns {{id: string, title: string, createdAt: Date, updatedAt: Date}} new tag
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
   * @returns {{id: string, thumbnailUrl: string, imageUrl: string, description: string, title: string, createdAt: Date, updatedAt: Date}}
   */
  createGroup(groupName) {
    const id = uuidv4();
    const width = this.randomIntFromInterval(100, 1000);
    const height = this.randomIntFromInterval(100, 1000);
    const thumbnailUrl = `https://picsum.photos/${width}/${height}`;
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    const title = `Group ${groupName}`;
    const description = `This is a super awesome image ${id}!`;
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

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createImage() {
    const id = uuidv4();
    const width = this.randomIntFromInterval(100, 1000);
    const height = this.randomIntFromInterval(100, 1000);
    const thumbnailUrl = `https://picsum.photos/${width}/${height}`;
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    const title = `Test Image ${id}`;
    const description = `This is a super awesome image ${id}!`;
    const location = "";
    const createdAt = new Date();
    const updatedAt = new Date();
    return {
      id, width, height, thumbnailUrl, imageUrl, title, description, location, createdAt, updatedAt
    }
  }

  createImages() {
    const images = [];
    for (let i = 0; i < 100; i += 1) {
      images.push(this.createImage());
    }
    return this.queryInterface.bulkInsert(
      "images",
      images,
      {}
    );
  }

  async createImageGroups() {
    let groupId1 = await this.getIdByTitle("groups", "Natural Landscape");
    let groupId2 = await this.getIdByTitle("groups", "Urban Landscape");
    let imageId1 = await this.getIdByTitle("images", "Test Image");
    let imageId2 = await this.getIdByTitle("images", "Test Image 2");
    let imageId3 = await this.getIdByTitle("images", "Test Image 3");
    let imageId4 = await this.getIdByTitle("images", "Test Image 4");

    return this.queryInterface.bulkInsert(
      "imageGroups",
      [
        {
          id: uuidv4(),
          imageId: imageId1,
          groupId: groupId1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          imageId: imageId2,
          groupId: groupId1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          imageId: imageId3,
          groupId: groupId2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          imageId: imageId4,
          groupId: groupId1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          imageId: imageId4,
          groupId: groupId2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  }

  async createGroupTags() {
    let groupId = await this.getIdByTitle("groups", "Natural Landscape");
    let tagId = await this.getIdByTitle("tags", "landscape");

    return this.queryInterface.bulkInsert(
      "groupTags",
      [
        {
          id: uuidv4(),
          tagId: tagId,
          groupId: groupId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  }

  async createImageTags() {
    let imageId = await this.getIdByTitle("images", "Test Image");
    let tagId = await this.getIdByTitle("tags", "landscape");

    return this.queryInterface.bulkInsert(
      "imageTags",
      [
        {
          id: uuidv4(),
          tagId: tagId,
          imageId: imageId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  }
};
