// Add migration script to add totalPredictions and successfulPredictions
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'totalPredictions', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Users', 'successfulPredictions', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'totalPredictions');
    await queryInterface.removeColumn('Users', 'successfulPredictions');
  },
};
