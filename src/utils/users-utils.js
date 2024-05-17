const jwt = require('jsonwebtoken');

const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

const isPredictionSuccessful = (prediction) => {
  // Implement your logic to determine if the prediction was successful
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
};
