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
   * Get all of the images that match a certain query
   * 
   * @param {Object} json object with properties to query with
   * @returns all of the images containing the specified query items
   * @throws error if query fails
   */
  image.list = async ({ page, limit, thumbnailUrl, imageUrl, title, description, location }) => {
    try {
      // General query
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description, location
      }, isNil);

      const getAllOptions = { where: options };

      // Pagination
      if (limit) {
        getAllOptions.limit = limit;
      } else {
        getAllOptions.limit = LIMIT_DEFAULT;
      }

      if (page) {
        getAllOptions.offset = page * limit;
      } else {
        getAllOptions.offset = PAGE_DEFAULT;
      }

      return image.findAndCountAll(getAllOptions);
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching images.`
      };
    }
  };

  image.listAllForGroup = async ({ page, limit }, groupId, groupModel) => {
    try {
      // Pagination
      if (!limit) { limit = LIMIT_DEFAULT; }
      let offset = PAGE_DEFAULT;
      if (page) { offset = page * limit; }

      const options = {
        limit,
        offset,
        include: [{
          model: groupModel,
          attributes: [],
          where: {
            id: groupId
          }
        }]
      };

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
      let item = await image.findOne({
        where: {
          id: id
        }
      });

      if (item) return item;

      throw {
        status: httpStatus.NOT_FOUND,
        message: `Image, ${id}, deleted or does not exist.`
      };
    } catch (error) {
      throw error;
    }
  };

  return image;
};