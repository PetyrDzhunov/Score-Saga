const cron = require('node-cron');
const { getNextFixtures } = require('../services/match-service');

const getFixturesCronJob = cron.schedule('0 * * * *', async () => {
  try {
    console.log('Running job to fetch fixtures and create matches...');
    await getNextFixtures();
    console.log('Job completed successfully.');
  } catch (error) {
    console.error('Error occurred during job execution:', error);
  }
});

module.exports = getFixturesCronJob;
