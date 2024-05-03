const { config } = require('dotenv');

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';

const readEnvironmentFile = () => config({ path: envFile });

module.exports = { readEnvironmentFile };
