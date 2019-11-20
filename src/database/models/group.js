'use strict';

const httpStatus = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
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
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING(1234),
    }
  }, {});

  group.associate = (models) => {
    group.belongsToMany(models.image, {
      through: models.imageGroup,
      foreignKey: 'groupId'
    });
    group.belongsToMany(models.tag, {
      through: models.groupTag,
      foreignKey: 'groupId'
    });
  };

  /**
   * Get the where clause for group model
   * 
   * @param {any} filter object with properties to query with
   * @returns object defining where clause for group model
   */
  const getWhere = (filter) => {
    const { thumbnailUrl, imageUrl, title, description } = filter;
    const where = omitBy({ thumbnailUrl, imageUrl, title, description }, isNil);
    return where;
  }

  /**
   * Get all of the groups that match a certain query
   * 
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {any} filter object with properties to filter with
   * @returns list of groups
   * @throws error if query fails
   */
  group.list = async (limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter) => {
    try {
      const where = getWhere(filter);
      const options = { where, limit, offset };
      return group.findAndCountAll(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get all of the groups associated with a specific image that match a certain query
   * 
   * @param {string} imageId unique id of image to search for
   * @param {any} imageModel sequelize model to query on
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {Object} filter object with properties to query with
   * @returns list of groups
   * @throws error if query fails
   */
  group.listGroupsForImage = async (imageId, imageModel, limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter) => {
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
      return group.findAndCountAll(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find a group by its id.
   * 
   * @param {string} id of the group being searched for
   * @returns group item
   * @throws error if query fails
   */
  group.get = async (id) => {
    try {
      const where = { id };
      const options = { where };
      return group.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find an image in a group
   * 
   * @param {string} imageId unique id of image to search for
   * @param {string} groupId unique id of group to search for
   * @param {any} groupModel sequelize model to query on
   * @returns group item
   * @throws error if query fails
   */
  group.getGroupImage = async (imageId, groupId, groupModel) => {
    try {
      const where = { id: groupId };
      const include = [{
        model: groupModel,
        attributes: [],
        where: {
          id: imageId
        }
      }];
      const options = { where, include };
      return group.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Remove group association from image
   * 
   * @param {string} imageId unique id of image to search for
   * @param {number} groupId unique id of group to associate with image
   * @param {any} imageGroupModel sequelize model to query on
   * @returns number of groups that were removed from image
   * @throws error if query fails
   */
  group.removeGroupsFromImage = async (imageId, groupId, imageGroupModel) => {
    try {
      const response = await imageGroupModel.destroy({
        where: {
          imageId,
          groupId
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Add group assocation to specified image
   * 
   * @param {string} imageId unique image id of to search for
   * @param {number} groupId unique group id to create association with
   * @param {any} imageGroupModel sequelize model to query on
   * @returns number of groups that are now associated with image
   * @throws error if query fails
   */
  group.addGroupImage = async (imageId, groupId, imageGroupModel) => {
    try {
      const imageGroup = { groupId, imageId };
      const response = await imageGroupModel.create(imageGroup);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return group;
};