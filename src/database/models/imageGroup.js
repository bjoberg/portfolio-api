'use strict';

const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;

module.exports = (sequelize, DataTypes) => {
  const imageGroup = sequelize.define('imageGroup', {
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
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      },
      validate: {
        isUUID: 4,
        notEmpty: true
      }
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'images',
        key: 'id'
      },      
      validate: {
        isUUID: 4,
        notEmpty: true
      }
    }
  }, {});

  imageGroup.associate = function(models) {
    // associations can be defined here
  };

  /**
   * Get all of the imageGroups that match a certain query
   * @param {Object} json object with properties to query with
   * @returns all of the imageGroups containing the specified query items
   * @throws error if query fails
   */
  imageGroup.list = async ({page, limit, imageId, groupId}) => {
    try {
      const options = omitBy({
        imageId, groupId
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
  
      return imageGroup.findAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching imageGroups.`
      };
    }
  };

  return imageGroup;
};