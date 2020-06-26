'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('images', 'captureDate', {
        type: Sequelize.DATEONLY,
        defaultValue: null
      }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('images', 'captureDate'),
    ]);
  }
};
