const express = require('express');
const router = express.Router(); // Create a router instance

const { createUser, getAllUsers } = require('../services/users-service');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    const newUser = await createUser(username, email, password, avatar);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
router.get('/', () => console.log('here here '));

module.exports = router;
