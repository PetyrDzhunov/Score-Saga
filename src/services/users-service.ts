const User = require('../../models/user');
const { isValidEmail, isValidUsername } = require('../utils/users-utils');
const { CustomError, DatabaseError } = require('../utils/error-utils.js');

const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (err) {
    throw new DatabaseError(err);
  }
};

const createUser = async (
  username: string,
  email: string,
  password: string,
  avatar: string,
) => {
  console.log(isValidUsername(username));
  console.log(isValidEmail(email));
  if (!isValidUsername(username) || !isValidEmail(email)) {
    throw new CustomError('Username or email entered is wrong!', 500);
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
    console.log(err);
    throw new DatabaseError(err);
  }
};

module.exports = { createUser, getAllUsers };
