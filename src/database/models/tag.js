'use strict';

const httpStatus  = require('http-status');
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

  tag.associate = function(models) {
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
   * Get all of the tags that match a certain query
   * @param {Object} json object with properties to query with
   * @returns all of the tags containing the specified query items
   * @throws error if query fails
   */
  tag.list = async ({page, limit, title}) => {
    try {
      const options = omitBy({
        title
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
  
      return tag.findAndCountAll(getAllOptions); 
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching tags.`
      };
    }
  };

  /**
   * Try and find a tag by its id.
   * @param {string} id of the tag being searched for
   * @returns tag item
   * @throws error if query fails
   */
  tag.get = async (id) => {
    try {
      let item = await tag.findOne({
        where: {
          id: id
        }
      });
      
      if (item) return item;
  
      throw {
        status: httpStatus.NOT_FOUND,
        message: `Tag, ${id}, deleted or does not exist.`
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete all of the tags that match a certain query
   * @param {Object} json object with properties to query with
   * @returns number of tag rows affected
   * @throws error if query fails
   */
  tag.deleteAll = async ({title}) => {
    try {
      const options = omitBy({
        title
      }, isNil);

      return tag.destroy({
        where: options
      });
    } catch (error) {
      throw {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: `Error deleting tag(s).`
      };
    }
  };  

  return tag;
};