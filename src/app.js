const express = require('express');
const app = express();
const routes = require('../routes.js');
const { connectDB } = require('../config/database-config.js');
const errorHandler = require('./middlewares/error-handler.js');
const { readEnvironmentFile } = require('../config/envFile.js');
const getFixturesCronJob = require('./jobs/get_fixtures_cron_job.js');

readEnvironmentFile();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  getFixturesCronJob.start();
});
