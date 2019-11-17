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
   * @returns all of the groups containing the specified query items
   * @throws error if query fails
   */
  group.list = async (limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter = undefined) => {
    try {
      const where = getWhere(filter);
      const options = { where, limit, offset };

      return group.findAndCountAll(options);
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching groups.`
      };
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

  return group;
};