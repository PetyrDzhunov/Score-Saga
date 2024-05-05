const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getAllPredictions,
} = require('../services/predictions-service');

router.get('/', async (req, res, next) => {
  try {
    const allPredictions = await getAllPredictions();
    res.status(201).json(allPredictions);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const { userId, prediction } = req.body;
    const newUser = await createPrediction(userId, prediction);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

getAllPredictions;
module.exports = router;
