const express = require('express');
const app = express();
const routes = require('../routes.js');
const { connectDB } = require('../config/database-config.js');
const errorHandler = require('./middlewares/error-middleware.js');
const { readEnvironmentFile } = require('../config/envFile.js');
const getFixturesCronJob = require('./jobs/get_fixtures_cron_job.js');
const calculateSuccessRateCronJob = require('./jobs/calculate_success_rate_cron_job.js');
const { swaggerUi } = require('../config/swagger-config.js');
const cors = require('cors');
const path = require('path');
const YAML = require('yamljs');
const swaggerFilePath = path.resolve(__dirname, './swagger.yaml');
const swaggerDocument = YAML.load(swaggerFilePath);

readEnvironmentFile();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }),
);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
  getFixturesCronJob.start();
  calculateSuccessRateCronJob.start();
});

module.exports = app;
