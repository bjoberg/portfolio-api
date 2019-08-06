'use strict';

const httpStatus  = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

module.exports = (sequelize, DataTypes) => {
  const groupTag = sequelize.define('groupTag', {
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
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      },      
      validate: {
        isUUID: 4,
        notEmpty: true
      }
    }
  }, {});

  groupTag.associate = function(models) {
    // associations can be defined here
  };

  /**
   * Get all of the groupTags that match a certain query
   * @param {Object} json object with properties to query with
   * @returns all of the groupTags containing the specified query items
   * @throws error if query fails
   */
  groupTag.list = async ({page, limit, groupId, tagId}) => {
    try {
      const options = omitBy({
        groupId, tagId
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
  
      return groupTag.findAndCountAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching groupTags.`
      };
    }
  };

  /**
   * Try and find a group by its id.
   * @param {string} id of the group being searched for
   * @returns group item
   * @throws error if query fails
   */
  groupTag.get = async (id) => {
    try {
      let item = await groupTag.findOne({
        where: {
          id: id
        }
      });
      
      if (item) return item;
  
      throw {
        status: httpStatus.NOT_FOUND,
        message: `groupTag, ${id}, deleted or does not exist.`
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete all of the groupTags that match a certain query
   * @param {Object} json object with properties to query with
   * @returns number of groupTag rows affected
   * @throws error if query fails
   */
  groupTag.deleteAll = async ({groupId, tagId}) => {
    try {
      const options = omitBy({
        groupId, tagId
      }, isNil);

      return groupTag.destroy({
        where: options
      });
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error deleting groupTag(s).`
      };
    }
  };

  return groupTag;
};