const { Router } = require('express');
const usersController = require('./src/controllers/users-controller');
const predictionsController = require('./src/controllers/predictions-controller');
const router = Router();
router.use('/users', usersController);
router.use('/predictions', predictionsController);
module.exports = router;
