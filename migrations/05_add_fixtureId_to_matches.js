'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Matches', 'fixtureId', {
      type: Sequelize.INTEGER,
      allowNull: true, // or false depending on your requirements
      defaultValue: null, // or any default value you want to set
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Matches', 'fixtureId');
  },
};
