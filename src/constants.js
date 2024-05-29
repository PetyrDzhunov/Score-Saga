const SALT_ROUNDS = 10;
const VALID_PREDICTIONS = ['1', 'X', '2'];
const MINIMUM_PASSWORD_LENGTH = 6;
const JWT_EXPIRE_TIME = '1h';
const EXCLUDE_PASSWORD_QUERY = {
  attributes: { exclude: ['password'] },
};

module.exports = {
  SALT_ROUNDS,
  VALID_PREDICTIONS,
  MINIMUM_PASSWORD_LENGTH,
  JWT_EXPIRE_TIME,
  EXCLUDE_PASSWORD_QUERY,
};
