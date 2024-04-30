const express = require('express');
const app = express();
const port = 3000;
const routes = require('../routes');
const { connectDB } = require('../config/database-config');

connectDB();

app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
