const { Router } = require('express');
const usersController = require('./src/controllers/users-controller');
const predictionsController = require('./src/controllers/predictions-controller');
const matchesController = require('./src/controllers/matches-controller');
const router = Router();
router.use('/matches', matchesController);
router.use('/users', usersController);
router.use('/predictions', predictionsController);
module.exports = router;
