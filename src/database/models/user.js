"use strict";

const httpStatus = require("http-status");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
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
      googleId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );

  user.associate = function(models) {};

  /**
   * Try and find a user by its google id.
   * @param {string} googleId of the user being searched for
   * @returns user item
   * @throws error if query fails
   */
  user.getByGoogleId = async googleId => {
    try {
      let item = await user.findOne({
        where: {
          googleId: googleId
        }
      });

      if (item) return item;

      throw {
        status: httpStatus.NOT_FOUND,
        message: `User does not exist`
      };
    } catch (error) {
      throw error;
    }
  };

  return user;
};
