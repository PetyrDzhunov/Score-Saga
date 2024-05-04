const express = require('express');
const app = express();
const routes = require('../routes');
const dotenv = require('dotenv');
const { connectDB, main } = require('../config/database-config');
const errorHandler = require('./middlewares/error-handler.js');
const { readEnvironmentFile } = require('../config/envFile.js');

readEnvironmentFile();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
