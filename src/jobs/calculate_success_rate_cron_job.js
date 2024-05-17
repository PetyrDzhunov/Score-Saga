const cron = require('node-cron');
const { calculateUserSucessRate } = require('../services/users-service');

// cron-job running to fetch fixtures for next week from football-api and save it into DB every 3 days
//*/10 * * * * *
const calculateSuccessRateCronJob = cron.schedule('0 * * * *', async () => {
  try {
    console.log('Running job to calculate success rate');
    await calculateUserSucessRate();
    console.log('Calculation success rate completed successfully.');
  } catch (error) {
    console.error('Error occurred during job execution:', error);
  }
});

module.exports = calculateSuccessRateCronJob;
