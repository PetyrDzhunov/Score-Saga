'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Predictions', 'matchId');
  },

  down: async (queryInterface, Sequelize) => {},
};
