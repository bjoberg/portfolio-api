'use strict';

const httpStatus = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4,
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  tag.associate = function (models) {
    tag.belongsToMany(models.group, {
      through: models.groupTag,
      foreignKey: 'tagId'
    });

    tag.belongsToMany(models.image, {
      through: models.imageTag,
      foreignKey: 'tagId'
    });
  };

  /**
   * Get the where clause for tag model
   * 
   * @param {any} filter object with properties to query with
   * @returns object defining where clause for tag model
   */
  const getWhere = (filter) => {
    const { title } = filter;
    const where = omitBy({ title }, isNil);
    return where;
  }

  /**
   * Get all of the tags that match a certain query
   * 
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {any} filter object with properties to filter with
   * @returns all of the tags containing the specified query items
   * @throws error if query fails
   */
  tag.list = async (limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter) => {
    try {
      const where = getWhere(filter);
      const options = { where, limit, offset };

      return tag.findAndCountAll(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get all of the tags in a specific group that match a certain query
   * 
   * @param {string} groupId unique id of group to search for
   * @param {any} groupModel sequelize model to query on
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {Object} filter object with properties to query with
   * @returns all of the tags in a specific group containing the specified query items
   * @throws error if query fails
   */
  tag.listTagsForGroup = async (groupId, groupModel, limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter) => {
    try {
      const where = getWhere(filter);
      const include = [{
        model: groupModel,
        attributes: [],
        where: {
          id: groupId
        }
      }];
      const options = { limit, offset, where, include };

      return tag.findAndCountAll(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get all of the tags associated with a specific image that match a certain query
   * 
   * @param {string} imageId unique id of image to search for
   * @param {any} imageModel sequelize model to query on
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {Object} filter object with properties to query with
   * @returns all of the tags associated with a specific image containing the specified query items
   * @throws error if query fails
   */
  tag.listTagsForImage = async (imageId, imageModel, limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter) => {
    try {
      const where = getWhere(filter);
      const include = [{
        model: imageModel,
        attributes: [],
        where: {
          id: imageId
        }
      }];
      const options = { limit, offset, where, include };

      return tag.findAndCountAll(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find a tag by its id.
   * 
   * @param {string} id of the tag being searched for
   * @returns tag item
   * @throws error if query fails
   */
  tag.get = async (id) => {
    try {
      const where = { id };
      const options = { where };
      return group.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find an tag in a group
   * 
   * @param {string} groupId unique id of group to search for
   * @param {string} tagId unique id of tag to search for
   * @param {any} groupModel sequelize model to query on
   * @returns tag item
   * @throws error if query fails
   */
  tag.getTagInGroup = async (groupId, tagId, groupModel) => {
    try {
      const where = { id: tagId };
      const include = [{
        model: groupModel,
        attributes: [],
        where: {
          id: groupId
        }
      }];
      const options = { where, include };
      return tag.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find a tag associated with a specific image
   * 
   * @param {string} imageId unique id of image to search for
   * @param {string} tagId unique id of tag to search for
   * @param {any} imageModel sequelize model to query on
   * @returns tag item
   * @throws error if query fails
   */
  tag.getTagInImage = async (imageId, tagId, imageModel) => {
    try {
      const where = { id: tagId };
      const include = [{
        model: imageModel,
        attributes: [],
        where: {
          id: imageId
        }
      }];
      const options = { where, include };
      return tag.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  return tag;
};