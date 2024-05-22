const express = require('express');
const app = express();
const routes = require('../routes.js');
const { connectDB } = require('../config/database-config.js');
const errorHandler = require('./middlewares/error-middleware.js');
const { readEnvironmentFile } = require('../config/envFile.js');
const getFixturesCronJob = require('./jobs/get_fixtures_cron_job.js');
const calculateSuccessRateCronJob = require('./jobs/calculate_success_rate_cron_job.js');
const { swaggerUi } = require('../config/swagger-config.js');

const path = require('path');
const YAML = require('yamljs');

const swaggerFilePath = path.resolve(__dirname, './swagger.yaml');
const swaggerDocument = YAML.load(swaggerFilePath);
readEnvironmentFile();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  getFixturesCronJob.start();
  calculateSuccessRateCronJob.start();
});

module.exports = app;
