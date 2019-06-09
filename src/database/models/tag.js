'use strict';

const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;

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
  tag.getAll = ({page, limit, title}) => {
    try {
      const options = omitBy({
        title
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
  
      return tag.findAll(getAllOptions); 
    } catch (error) {
      throw error;
    }
  };

  return tag;
};