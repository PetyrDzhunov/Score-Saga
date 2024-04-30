'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    static associate(models) {
      Prediction.belongsTo(models.User);
    }
  }
  Prediction.init(
    {
      matchId: DataTypes.STRING,
      prediction: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Prediction',
    },
  );
  return Prediction;
};
