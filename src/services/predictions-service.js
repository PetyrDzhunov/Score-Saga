const Prediction = require('../../models/prediction.js');
const { CustomError, handleError } = require('../utils/error-utils.js');
const { getUserByUsername, getOneUserById } = require('./users-service.js');
const { getOneMatch } = require('./match-service.js');
const { isValidPrediction } = require('../utils/prediction-utils.js');

const getAllPredictions = async () => {
  try {
    const allPredictions = await Prediction.findAll();
    return allPredictions;
  } catch (err) {
    handleError(err);
  }
};

const getOnePrediction = async (id) => {
  try {
    const prediction = await Prediction.findByPk(id);
    return prediction;
  } catch (err) {
    handleError(err);
  }
};

const updatePrediction = async (userId, prediction, matchId) => {
  if (!isValidPrediction(prediction)) {
    throw new CustomError('Invalid prediction', 404);
  }

  const existingPrediction = await Prediction.findOne({
    where: { UserId: userId, MatchId: matchId },
  });

  if (!existingPrediction) {
    throw new CustomError('Prediction not found', 404);
  }

  if (existingPrediction.prediction === prediction) {
    throw new CustomError(`Prediction is already ${prediction}`, 404);
  }

  try {
    existingPrediction.prediction = prediction;
    await existingPrediction.save();
    return existingPrediction;
  } catch (err) {
    handleError(err);
  }
};

const createPrediction = async (userId, prediction, matchId) => {
  if (!isValidPrediction(prediction)) {
    throw new CustomError('Invalid prediction', 404);
  }

  const existingPrediction = await Prediction.findOne({
    where: { UserId: userId, MatchId: matchId },
  });

  if (existingPrediction) {
    throw new CustomError('User can have only one prediction per match!', 409);
  }

  try {
    const newPrediction = await Prediction.create(
      {
        prediction,
        userId,
        matchId,
      },
      {
        returning: ['id', 'prediction', 'createdAt', 'updatedAt'],
      },
    );
    const user = await getOneUserById(userId);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    await user.addPredictions(newPrediction);
    const match = await getOneMatch(matchId);
    if (!match) {
      throw new CustomError('Match not found', 404);
    }

    await match.addPredictions(newPrediction);
    return newPrediction;
  } catch (err) {
    handleError(err);
  }
};

const deleteOnePrediction = async (id) => {
  try {
    return await Prediction.destroy({ where: { id } });
  } catch (err) {
    handleError(err);
  }
};

module.exports = {
  createPrediction,
  getAllPredictions,
  getOnePrediction,
  updatePrediction,
  deleteOnePrediction,
};
