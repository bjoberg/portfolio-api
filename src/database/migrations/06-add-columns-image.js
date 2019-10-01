'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'images',
        'width',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'images',
        'height',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('images', 'width'),
      queryInterface.removeColumn('images', 'height')
    ]);
  }
};
