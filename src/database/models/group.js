'use strict';

const httpStatus  = require('http-status');
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

  group.associate = function(models) {
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
   * Get all of the groups that match a certain query
   * @param {Object} json object with properties to query with
   * @returns all of the groups containing the specified query items
   * @throws error if query fails
   */
  group.list = async ({page, limit, thumbnailUrl, imageUrl, title, description}) => {
    try {
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description
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
  
      return group.findAndCountAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching groups.`
      };
    }
  };

  /**
   * Try and find a group by its id.
   * @param {string} id of the group being searched for
   * @returns group item
   * @throws error if query fails
   */
  group.get = async (id) => {
    try {
      let item = await group.findOne({
        where: {
          id: id
        }
      });
      
      if (item) return item;
  
      throw {
        status: httpStatus.NOT_FOUND,
        message: `Group, ${id}, deleted or does not exist.`
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete all of the groups that match a certain query
   * @param {Object} json object with properties to query with
   * @returns number of group rows affected
   * @throws error if query fails
   */
  group.deleteAll = async ({thumbnailUrl, imageUrl, title, description}) => {
    try {
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description
      }, isNil);

      return group.destroy({
        where: options
      });
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error deleting group(s).`
      };
    }
  };

  return group;
};