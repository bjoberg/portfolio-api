'use strict';
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
  return groupTag;
};