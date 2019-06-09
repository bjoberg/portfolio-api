'use strict'

const uuidv4 = require('uuid/v4');

module.exports = class SeederHelper {
  constructor(queryInterface) {
    this.queryInterface = queryInterface;
  }

  async deleteAll() {
    await this.queryInterface.bulkDelete('imageGroups', null, {});
    await this.queryInterface.bulkDelete('groupTags', null, {});
    await this.queryInterface.bulkDelete('imageTags', null, {});    
    await this.queryInterface.bulkDelete('tags', null, {});
    await this.queryInterface.bulkDelete('groups', null, {});
    await this.queryInterface.bulkDelete('images', null, {});
  }

  async getIdByTitle(table, title) {
    const id = await this.queryInterface.sequelize.query(
      `SELECT id from "${table}"
      WHERE title='${title}';`
    );
    return id[0][0].id;
  }

  createTags() {
    return this.queryInterface.bulkInsert('tags', [
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
  }

  createGroups() {
    return this.queryInterface.bulkInsert('groups', [{
      id: uuidv4(),
      thumbnailUrl: 'https://www.testUrl.com',
      imageUrl: 'https://www.testUrl.com',
      title: 'Natural Landscape',
      description: 'This is a group',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  createImages() {
    return this.queryInterface.bulkInsert('images', [{
      id: uuidv4(),
      thumbnailUrl: 'https://www.testUrl.com',
      imageUrl: 'https://www.testUrl.com',
      title: 'Test Image',
      description: 'This is a super awesome image!',
      location: 'Chicago, IL',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  async createImageGroups() {
    let groupId = await this.getIdByTitle('groups', 'Natural Landscape');
    let imageId = await this.getIdByTitle('images', 'Test Image');

    return this.queryInterface.bulkInsert('imageGroups', [{
      id: uuidv4(),
      imageId: imageId,
      groupId: groupId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  async createGroupTags() {
    let groupId = await this.getIdByTitle('groups', 'Natural Landscape');
    let tagId = await this.getIdByTitle('tags', 'landscape');

    return this.queryInterface.bulkInsert('groupTags', [{
      id: uuidv4(),
      tagId: tagId,
      groupId: groupId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  async createImageTags() {
    let imageId = await this.getIdByTitle('images', 'Test Image');
    let tagId = await this.getIdByTitle('tags', 'landscape');

    return this.queryInterface.bulkInsert('imageTags', [{
      id: uuidv4(),
      tagId: tagId,
      imageId: imageId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }    
}