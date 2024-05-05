const express = require('express');
const router = express.Router();
const { createPrediction } = require('../services/predictions-service');

router.post('/', async (req, res, next) => {
  try {
    const { userId, prediction } = req.body;
    const newUser = await createPrediction(userId, prediction);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
