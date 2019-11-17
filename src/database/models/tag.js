'use strict';

const httpStatus = require('http-status');
const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;
const LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
const PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  tag.associate = function (models) {
    tag.belongsToMany(models.group, {
      through: models.groupTag,
      foreignKey: 'tagId'
    });

    tag.belongsToMany(models.image, {
      through: models.imageTag,
      foreignKey: 'tagId'
    });
  };

  /**
   * Get the where clause for tag model
   * 
   * @param {any} filter object with properties to query with
   * @returns object defining where clause for tag model
   */
  const getWhere = (filter) => {
    const { title } = filter;
    const where = omitBy({ title }, isNil);
    return where;
  }

  /**
   * Get all of the tags that match a certain query
   * 
   * @param {number} limit number of items to return
   * @param {number} offset range of items to return
   * @param {any} filter object with properties to filter with
   * @returns all of the tags containing the specified query items
   * @throws error if query fails
   */
  tag.list = async (limit = LIMIT_DEFAULT, offset = PAGE_DEFAULT, filter = undefined) => {
    try {
      const where = getWhere(filter);
      const options = { where, limit, offset };

      return tag.findAndCountAll(options);
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching tags.`
      };
    }
  };

  /**
   * Try and find a tag by its id.
   * 
   * @param {string} id of the tag being searched for
   * @returns tag item
   * @throws error if query fails
   */
  tag.get = async (id) => {
    try {
      const where = { id };
      const options = { where };
      const item = await group.findOne(options);

      if (item) {
        return item;
      } else {
        throw {
          status: httpStatus.NOT_FOUND,
          message: `Tag, ${id}, deleted or does not exist.`
        };
      }
    } catch (error) {
      throw error;
    }
  };

  return tag;
};