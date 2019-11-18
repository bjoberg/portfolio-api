'use strict';

const httpStatus = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
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
    },
    location: {
      type: DataTypes.STRING,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  image.associate = function (models) {
    image.belongsToMany(models.group, {
      through: models.imageGroup,
      foreignKey: 'imageId'
    });

    image.belongsToMany(models.tag, {
      through: models.imageTag,
      foreignKey: 'imageId'
    });
  };

  /**
   * Get the where clause for image model
   * 
   * @param {any} filter object with properties to query with
   * @returns object defining where clause for image model
   */
  const getWhere = (filter) => {
    const { thumbnailUrl, imageUrl, title, description, location } = filter;
    const where = omitBy({ thumbnailUrl, imageUrl, title, description, location }, isNil);
    return where;
  }

  /**
   * Get all of the images that match a certain query
   * 
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {any} filter object with properties to query with
   * @returns all of the images containing the specified query items
   * @throws error if query fails
   */
  image.list = async (limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter = undefined) => {
    try {
      const where = getWhere(filter);
      const options = { where, limit, offset };

      return image.findAndCountAll(options);
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching images.`
      };
    }
  };

  /**
   * Get all of the images in a specific group that match a certain query
   * 
   * @param {string} groupId unique id of group to search for
   * @param {any} groupModel sequelize model to query on
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {Object} filter object with properties to query with
   * @returns all of the images in a specific group containing the specified query items
   * @throws error if query fails
   */
  image.listImagesForGroup = async (
    groupId = undefined,
    groupModel = undefined,
    limit = LIMIT_DEFAULT,
    offset = PAGE_DEFAULT,
    filter = undefined) => {
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

      return image.findAndCountAll(options);
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching images in ${groupId}.`
      };
    }
  };

  /**
   * Try and find an image by its id.
   * 
   * @param {string} id of the image being searched for
   * @returns image item
   * @throws error if query fails
   */
  image.get = async (id) => {
    try {
      const where = { id };
      const options = { where };
      return image.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Try and find an image in a group
   * 
   * @param {string} groupId unique id of group to search for
   * @param {string} imageId unique id of image to search for
   * @param {any} groupModel sequelize model to query on
   * @returns image item
   * @throws error if query fails
   */
  image.getImageInGroup = async (groupId, imageId, groupModel) => {
    try {
      const where = { id: imageId };
      const include = [{
        model: groupModel,
        attributes: [],
        where: {
          id: groupId
        }
      }];
      const options = { where, include };
      return image.findOne(options);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Remove image from the specified group
   * 
   * @param {string} groupId unique group id of group to search for
   * @param {number} imageId unique image id to remove from group
   * @param {any} imageGroupModel sequelize model to query on
   * @returns number of images that were removed from group
   * @throws error if query fails
   */
  image.removeImageFromGroup = async (groupId = undefined, imageId = undefined, imageGroupModel = undefined) => {
    try {
      const response = await imageGroupModel.destroy({
        where: {
          imageId,
          groupId
        }
      });
      return response;
    } catch (error) {
      let message = `Error removing image from ${groupId}.`
      let status = httpStatus.INTERNAL_SERVER_ERROR;
      if (error.message) message = error.message;
      throw { status, message };
    }
  };

  /**
   * Add image to the specified group
   * 
   * @param {string} groupId unique group id of group to search for
   * @param {number} imageId unique image id to remove from group
   * @param {any} imageGroupModel sequelize model to query on
   * @returns number of images that were added to the group
   * @throws error if query fails
   */
  image.addImageToGroup = async (groupId = undefined, imageId = undefined, imageGroupModel = undefined) => {
    try {
      const imageGroup = { groupId, imageId };
      const response = await imageGroupModel.create(imageGroup);
      return response;
    } catch (error) {
      let message = `Error adding image to ${groupId}.`
      let status = httpStatus.INTERNAL_SERVER_ERROR;
      if (error.message) message = error.message;
      throw { status, message };
    }
  };

  return image;
};