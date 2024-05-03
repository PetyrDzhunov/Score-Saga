const { Sequelize } = require('sequelize');
import { config } from 'dotenv';
// const sequelize = new Sequelize(
//   'postgresql://app:94M39oMpou5P4x9260SxAlCD@quietly-cunning-stingray.a1.pgedge.io/scoresaga?sslmode=no-verify',
//   {
//     // Choose one of the logging options
//     logging: (...msg) => console.log(msg), // Displays all log function call parameters
//   },
// );

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
config({ path: envFile });

const sequelize = new Sequelize({
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const connectDB = async () => {
  console.log('Connecting to the database...');
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL sucessfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };
