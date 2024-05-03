const { Sequelize } = require('sequelize');
import { Client } from 'pg';

// const sequelize = new Sequelize(
//   'postgresql://app:94M39oMpou5P4x9260SxAlCD@quietly-cunning-stingray.a1.pgedge.io/scoresaga?sslmode=no-verify',
//   {
//     // Choose one of the logging options
//     logging: (...msg) => console.log(msg), // Displays all log function call parameters
//   },
// );

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'pecata941102',
  database: 'postgres',
});

const connectDB = async () => {
  console.log('Connecting to the database...');
  try {
    await sequelize.authenticate();
    console.log('connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };
