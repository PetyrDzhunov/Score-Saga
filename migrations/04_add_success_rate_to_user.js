'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'successRate', {
      type: Sequelize.FLOAT, // Assuming FLOAT data type for decimal values
      allowNull: false,
      defaultValue: 0, // Default success rate can be set to 0
      validate: {
        min: 0,
        max: 1, // Maximum value should be 1 (100%)
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'successRate');
  },
};
