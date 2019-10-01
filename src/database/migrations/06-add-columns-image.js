'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('images','width', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn('images', 'height', {
          type: Sequelize.INTEGER,
          defaultValue: 0
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
