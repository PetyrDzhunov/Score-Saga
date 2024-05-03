const { readEnvironmentFile } = require('./envFile');
readEnvironmentFile();

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
