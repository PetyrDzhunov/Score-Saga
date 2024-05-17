const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database-config');

class Prediction extends Model {}

Prediction.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    prediction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    modelName: 'Prediction',
    tableName: 'Predictions',
  },
);

module.exports = Prediction;
