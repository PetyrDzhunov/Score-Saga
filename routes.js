const { Router } = require('express');
const usersController = require('./src/controllers/users-controller');
const matchesController = require('./src/controllers/matches-controller');
const predictionsController = require('./src/controllers/predictions-controller');
const router = Router();
router.use('/users', usersController);
router.use('/predictions', predictionsController);
router.use('/matches', matchesController);
module.exports = router;
