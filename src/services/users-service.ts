const User = require('../../models/user');

const createUser = async (
  username: string,
  email: string,
  password: string,
  avatar: string,
) => {
  // add validation rules
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required');
  }
  let newUser;
  try {
    newUser = await User.create({
      username,
      email,
      password,
      avatar,
    });
  } catch (err) {
    throw err;
  }

  return newUser;
};

module.exports = { createUser };
