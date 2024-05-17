const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database-config');
const Prediction = require('./prediction');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPredictions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    successfulPredictions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    successRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  },
);

User.hasMany(Prediction);
Prediction.belongsTo(User);

module.exports = User;
