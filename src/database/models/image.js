'use strict';

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
  image.getAll = ({page, perPage, thumbnailUrl, imageUrl, title, description, location}) => {
    try {
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description, location
      }, isNil);
  
      const getAllOptions = {
        where: options
      };
  
      if (page && perPage) {
        getAllOptions.offset = (page - 1) * perPage;
        getAllOptions.limit = perPage;
      };
  
      return image.findAll(getAllOptions); 
    } catch (error) {
      throw error;
    }
  };

  return image;
};