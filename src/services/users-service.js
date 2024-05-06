const User = require('../../models/user.js');
const { isValidEmail, isValidUsername } = require('../utils/users-utils.js');
const { CustomError, DatabaseError } = require('../utils/error-utils.js');

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

const createUser = async (username, email, password, avatar) => {
  if (!isValidUsername(username) || !isValidEmail(email)) {
    throw new CustomError('Username or email is wrong!', 500);
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password,
      avatar,
    });
    return newUser;
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
  createUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  getAllPredictionsForUser,
};
