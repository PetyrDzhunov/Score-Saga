const { Sequelize } = require('sequelize');
const { readEnvironmentFile } = require('./envFile');

readEnvironmentFile();
const sequelize = new Sequelize({
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL sucessfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
