const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../../models/user.js');
const { SALT_ROUNDS, EXCLUDE_PASSWORD_QUERY } = require('../constants.js');
const {
  isValidEmail,
  isValidUsername,
  generateToken,
  isPredictionSuccessful,
  isInvalidPassword,
} = require('../utils/users-utils.js');
const { CustomError, handleError } = require('../utils/error-utils.js');
const Match = require('../../models/match.js');

const getAllUsers = async () => {
  try {
    return await User.findAll(EXCLUDE_PASSWORD_QUERY);
  } catch (err) {
    handleError(err);
  }
};

const getSortedAllusers = async (sortType) => {
  try {
    return await User.findAll({
      order: [['successRate', sortType]],
      EXCLUDE_PASSWORD_QUERY,
    });
  } catch (err) {
    handleError(err);
  }
};
const getUserByUsername = async (username) => {
  try {
    return await User.findOne({ where: { username } }, EXCLUDE_PASSWORD_QUERY);
  } catch (err) {
    handleError(err);
  }
};

const getOneUserById = async (id) => {
  try {
    return await User.findByPk(id, EXCLUDE_PASSWORD_QUERY);
  } catch (err) {
    handleError(err);
  }
};

const registerUser = async (username, email, password, avatar) => {
  if (!isValidUsername(username) || !isValidEmail(email)) {
    throw new CustomError('Username or email is wrong!', 500);
  }

  if (isInvalidPassword(password)) {
    throw new CustomError('Password is too short', 500);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    const token = generateToken(newUser);

    return { user: newUser, token };
  } catch (err) {
    handleError(err);
  }
};

const loginUser = async (usernameOrEmail, password) => {
  try {
    const userToLogin = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!userToLogin) {
      throw new CustomError('User not found!', 500);
    }

    const isRightPassword = await bcrypt.compare(
      password,
      userToLogin.password,
    );

    if (!isRightPassword) {
      throw new CustomError('Username, email or password is wrong!', 500);
    }
    const token = generateToken(userToLogin);
    return { user: userToLogin, token };
  } catch (err) {
    handleError(err);
  }
};

const deleteOneUser = async (id) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (err) {
    handleError(err);
  }
};

const getAllPredictionsForUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const predictions = await user.getPredictions();
    return predictions;
  } catch (err) {
    handleError(err);
  }
};

const calculateUserSucessRate = async () => {
  try {
    const allUsers = await getAllUsers();
    for (const user of allUsers) {
      const predictions = await getUserPredictionsWithMatchInformation(user);
      let newSuccessfulPredictions = 0;
      let newTotalPredictions = 0;
      for (const prediction of predictions) {
        const match = prediction.Match;
        if (match && match.status === 'FT' && !prediction.checked) {
          if (isPredictionSuccessful(prediction)) {
            newSuccessfulPredictions++;
          }
          newTotalPredictions++;
          prediction.checked = true;
          await prediction.save();
        }
      }

      user.totalPredictions += newTotalPredictions;
      user.successfulPredictions += newSuccessfulPredictions;

      const successRate = user.successfulPredictions / user.totalPredictions;

      if (user.totalPredictions === 0) {
        user.successRate = 0;
      }

      if (!isNaN(successRate)) {
        user.successRate = successRate;
      }

      await user.save();
    }
  } catch (err) {
    handleError(err);
  }
};

const getUserPredictionsWithMatchInformation = async (user) => {
  return await user.getPredictions({
    include: [
      {
        model: Match,
        as: 'Match',
      },
    ],
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUserById,
  getUserByUsername,
  deleteOneUser,
  getAllPredictionsForUser,
  calculateUserSucessRate,
  getSortedAllusers,
};
