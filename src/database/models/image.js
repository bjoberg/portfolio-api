'use strict';

const httpStatus  = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;

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
    }
  }, {});

  image.associate = function(models) {
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
   * @param {Object} json object with properties to query with
   * @returns all of the images containing the specified query items
   * @throws error if query fails
   */
  image.list = async ({page, limit, thumbnailUrl, imageUrl, title, description, location}) => {
    try {
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description, location
      }, isNil);
  
      const getAllOptions = {
        where: options
      };
  
      if (page && limit) {
        getAllOptions.offset = page * limit;
        getAllOptions.limit = limit;
      } else {
        getAllOptions.page = 0;
        getAllOptions.limit = 30;
      };
  
      return image.findAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching images.`
      };
    }
  };

  /**
   * Try and find an image by its id.
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