const express = require('express');
const app = express();
const getFixturesCronJob = require('./jobs/get_fixtures_cron_job.js');
const calculateSuccessRateCronJob = require('./jobs/calculate_success_rate_cron_job.js');
const { configurateExpress } = require('../config/express-config.js');
const { PORT } = require('./constants.js');

configurateExpress(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  getFixturesCronJob.start();
  calculateSuccessRateCronJob.start();
});

module.exports = app;
