import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgresql://app:94M39oMpou5P4x9260SxAlCD@quietly-cunning-stingray.a1.pgedge.io/scoresaga?sslmode=no-verify',
);

const connectDB = async () => {
  console.log('Connecting to the database...');
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };
