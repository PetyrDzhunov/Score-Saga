const Prediction = require('../../models/prediction.js');
const { DatabaseError } = require('../utils/error-utils.js');

const createPrediction = async (userId, prediction) => {
  try {
    const newPrediction = await Prediction.create({
      userId,
      prediction,
    });
    return newPrediction;
  } catch (err) {
    console.error(err);
    // throw new DatabaseError(err);
  }
};

module.exports = { createPrediction };
