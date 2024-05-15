const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getAllPredictions,
  updatePrediction,
  deleteOnePrediction,
} = require('../services/predictions-service');
const authenticationMiddleware = require('../middlewares/auth-middleware');

router.get('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const allPredictions = await getAllPredictions();
    res.status(201).json(allPredictions);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const { userId, prediction, matchId } = req.body;
    const newPrediction = await createPrediction(userId, prediction, matchId);
    res.status(201).json(newPrediction);
  } catch (error) {
    next(error);
  }
});

router.put('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const { userId, prediction, matchId } = req.body;
    const updatedPrediction = await updatePrediction(
      userId,
      prediction,
      matchId,
    );
    res.status(200).json(updatedPrediction);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticationMiddleware, async (req, res, next) => {
  try {
    await deleteOnePrediction(req.params.id);
    res.status(204).json({ message: 'Successfully deleted Prediction!' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
