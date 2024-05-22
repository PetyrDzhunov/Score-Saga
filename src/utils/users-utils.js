const jwt = require('jsonwebtoken');
const { MINIMUM_PASSWORD_LENGTH, JWT_EXPIRE_TIME } = require('../constants');

process.env.JWT_SECRET = 'test_secret_key';

const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isInvalidPassword = (password) => {
  return password.length < MINIMUM_PASSWORD_LENGTH;
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  });

  return token;
};

const isPredictionSuccessful = (prediction) => {
  const { prediction: finalPrediction, Match } = prediction;
  return (
    (finalPrediction === 'X' &&
      !Match.homeTeamWinner &&
      !Match.homeTeamWinner) ||
    (finalPrediction === '1' && Match.homeTeamWinner) ||
    (finalPrediction === '2' && Match.awayTeamWinner)
  );
};

module.exports = {
  isValidEmail,
  isValidUsername,
  generateToken,
  isPredictionSuccessful,
  isInvalidPassword,
};
