const User = require('../../models/user.js');
const { isValidEmail, isValidUsername } = require('../utils/users-utils.js');
const { CustomError, DatabaseError } = require('../utils/error-utils.js');
const { SALT_ROUNDS } = require('../constants.js');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (err) {
    throw new DatabaseError(err);
  }
};

const getOneUser = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (err) {
    throw new DatabaseError(err);
  }
};

const registerUser = async (username, email, password, avatar) => {
  if (!isValidUsername(username) || !isValidEmail(email)) {
    throw new CustomError('Username or email is wrong!', 500);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    return newUser;
  } catch (err) {
    throw new DatabaseError(err);
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

    return userToLogin;
  } catch (err) {
    throw new DatabaseError(err);
  }
};

const deleteOneUser = async (id) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (err) {
    throw new DatabaseError(err);
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
    throw new DatabaseError(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  getAllPredictionsForUser,
};
