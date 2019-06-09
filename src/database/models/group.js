'use strict';

const omitBy = require('lodash').omitBy;
const isNil = require('lodash').isNil;

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
  group.getAll = ({page, limit, thumbnailUrl, imageUrl, title, description}) => {
    try {
      const options = omitBy({
        thumbnailUrl, imageUrl, title, description
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
  
      return group.findAll(getAllOptions); 
    } catch (error) {
      throw error;
    }
  };

  return group;
};