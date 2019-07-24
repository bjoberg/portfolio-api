'use strict';

const httpStatus  = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

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
  
      return imageGroup.findAndCountAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching imageGroups.`
      };
    }
  };

  /**
   * Try and find a imageGroup by its id.
   * @param {string} id of the imageGroup being searched for
   * @returns imageGroup item
   * @throws error if query fails
   */
  imageGroup.get = async (id) => {
    try {
      let item = await imageGroup.findOne({
        where: {
          id: id
        }
      });
      
      if (item) return item;
  
      throw {
        status: httpStatus.NOT_FOUND,
        message: `imageGroup, ${id}, deleted or does not exist.`
      };
    } catch (error) {
      throw error;
    }
  };  

  /**
   * Delete all of the imageGroups that match a certain query
   * @param {Object} json object with properties to query with
   * @returns number of imageGroup rows affected
   * @throws error if query fails
   */
  imageGroup.deleteAll = async ({imageId, groupId}) => {
    try {
      const options = omitBy({
        imageId, groupId
      }, isNil);

      return imageGroup.destroy({
        where: options
      });
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error deleting imageGroup(s).`
      };
    }
  };

  return imageGroup;
};