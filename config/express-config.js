const express = require('express');
const path = require('path');
const YAML = require('yamljs');

const { CSS_URL, CUSTOM_CSS, CORS_OPTIONS } = require('../src/constants.js');
const routes = require('../routes.js');
const { connectDB } = require('../config/database-config.js');
const errorHandler = require('../src/middlewares/error-middleware.js');
const { readEnvironmentFile } = require('../config/envFile.js');
const cors = require('cors');
const { swaggerUi } = require('../config/swagger-config.js');
const swaggerFilePath = path.resolve(__dirname, '../src/swagger.yaml');
const swaggerDocument = YAML.load(swaggerFilePath);

const configurateExpress = (app) => {
  readEnvironmentFile();
  connectDB();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(CORS_OPTIONS));
  app.use(routes);
  app.use(errorHandler);

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss: CUSTOM_CSS,
      customCssUrl: CSS_URL,
    }),
  );
};

module.exports = { configurateExpress };
