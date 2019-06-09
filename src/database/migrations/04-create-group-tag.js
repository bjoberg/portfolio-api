'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groupTags', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      groupId: {
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id'
        },
        type: Sequelize.UUID
      },
      tagId: {
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('groupTags');
  }
};