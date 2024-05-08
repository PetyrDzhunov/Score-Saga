const cron = require('node-cron');
const { getNextFixtures } = require('../services/match-service');

// cron-job running to fetch fixtures for next week from football-api and save it into DB every 3 days
//*/10 * * * * *
const getFixturesCronJob = cron.schedule('0 0 */3 * *', async () => {
  try {
    console.log('Running job to fetch fixtures and create matches...');
    await getNextFixtures();
    console.log('Job completed successfully.');
  } catch (error) {
    console.error('Error occurred during job execution:', error);
  }
});

module.exports = getFixturesCronJob;
