const cron = require('node-cron');
const { calculateUserSucessRate } = require('../services/users-service');

const calculateSuccessRateCronJob = cron.schedule('5 * * * *', async () => {
  try {
    console.log('Running job to calculate success rate');
    await calculateUserSucessRate();
    console.log('Calculation success rate completed successfully.');
  } catch (error) {
    console.error('Error occurred during job execution:', error);
  }
});

module.exports = calculateSuccessRateCronJob;
