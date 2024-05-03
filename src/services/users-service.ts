const User = require('../../models/user');

exports.createUser = async (
  username: string,
  email: string,
  password: string,
  avatar: string,
) => {
  console.log('Creating user...');
  // Validate input if necessary
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required');
  }

  // Create a new user using the User model's create method
  let newUser;
  try {
    newUser = await User.create({
      username,
      email,
      password,
      avatar,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    throw err; // Propagate the error to the caller
  }

  console.log('User created:', newUser.toJSON());

  return newUser; // Return the created user object
};
