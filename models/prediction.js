'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database-config'); // Import Sequelize instance
const User = require('./user');

const Prediction = sequelize.define(
  'Prediction',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    matchId: DataTypes.STRING,
    prediction: DataTypes.STRING,
    userId: DataTypes.STRING,
  },
  { tableName: 'Predictions' },
);

// Prediction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Prediction;
