'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new column to the Users table
    await queryInterface.addColumn('Users', 'predictions', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, // Specify whether the column allows NULL values
      defaultValue: [],
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the new column from the Users table if needed
    await queryInterface.removeColumn('Users', 'predictions');
  },
};
