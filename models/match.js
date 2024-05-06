const { sequelize } = require('../config/database-config');
const Prediction = require('./prediction');
const { DataTypes, Model } = require('sequelize');

class Match extends Model {}

Match.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    venue: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    homeTeamName: {
      type: DataTypes.STRING,
    },
    homeTeamLogo: {
      type: DataTypes.STRING,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    homeTeamWinner: {
      type: DataTypes.BOOLEAN,
    },
    awayTeamName: {
      type: DataTypes.STRING,
    },
    awayTeamLogo: {
      type: DataTypes.STRING,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeamWinner: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'Match',
    tableName: 'Matches',
  },
);

Match.hasMany(Prediction);
Prediction.belongsTo(Match);

module.exports = Match;
