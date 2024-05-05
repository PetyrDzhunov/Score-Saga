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
    // matchId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
    prediction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Prediction',
    tableName: 'Predictions',
  },
);

module.exports = Prediction;
