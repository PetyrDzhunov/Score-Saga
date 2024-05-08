const { VALID_PREDICTIONS } = require('../constants');

const isValidPrediction = (prediction) => {
  return VALID_PREDICTIONS.includes(prediction);
};

module.exports = { isValidPrediction };
