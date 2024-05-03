const express = require('express');
const router = express.Router(); // Create a router instance

const { createUser } = require('../services/users-service');

// Middleware function to handle POST requests to /users
router.post('/', async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const newUser = await createUser(username, email, password, avatar);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/', () => console.log('here here '));

module.exports = router;
