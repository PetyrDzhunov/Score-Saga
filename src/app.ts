const express = require('express');
const app = express();
const routes = require('../routes');
const dotenv = require('dotenv');
const { connectDB, main } = require('../config/database-config');

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFile });
connectDB();
app.use(express.json());

app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
