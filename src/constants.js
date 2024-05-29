const SALT_ROUNDS = 10;
const VALID_PREDICTIONS = ['1', 'X', '2'];
const MINIMUM_PASSWORD_LENGTH = 6;
const JWT_EXPIRE_TIME = '1h';
const EXCLUDE_PASSWORD_QUERY = {
  attributes: { exclude: ['password'] },
};

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';

const CUSTOM_CSS =
  '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }';

const CORS_OPTIONS = {
  origin: 'https://score-saga.vercel.app',
  optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 5000;

module.exports = {
  SALT_ROUNDS,
  VALID_PREDICTIONS,
  MINIMUM_PASSWORD_LENGTH,
  JWT_EXPIRE_TIME,
  EXCLUDE_PASSWORD_QUERY,
  CSS_URL,
  CUSTOM_CSS,
  CORS_OPTIONS,
  PORT,
};
