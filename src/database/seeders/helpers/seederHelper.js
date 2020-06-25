"use strict";

const uuidv4 = require("uuid/v4");

module.exports = class SeederHelper {
  constructor(queryInterface) {
    this.queryInterface = queryInterface;
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

  createUsers() {
    return this.queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
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

  createTags() {
    return this.queryInterface.bulkInsert(
      "tags",
      [
        {
          id: uuidv4(),
          title: "landscape",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: "urban",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: "mountians",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: "water",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  }

  createGroups() {
    return this.queryInterface.bulkInsert(
      "groups",
      [
        {
          id: uuidv4(),
          thumbnailUrl: "https://www.testUrl.com",
          imageUrl: "https://www.testUrl.com",
          title: "Natural Landscape",
          description: "This is a group",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          thumbnailUrl: "https://www.testUrl.com",
          imageUrl: "https://www.testUrl.com",
          title: "Urban Landscape",
          description: "This is a group",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
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
