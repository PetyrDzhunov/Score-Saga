const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUserById,
  deleteOneUser,
  getAllPredictionsForUser,
} = require('../services/users-service');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getOneUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/predictions', async (req, res, next) => {
  try {
    const predictions = await getAllPredictionsForUser(req.params.id);
    res.status(200).json(predictions);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await updateOneUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    const { user, token } = await registerUser(
      username,
      email,
      password,
      avatar,
    );
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const { token, user } = await loginUser(usernameOrEmail, password);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteOneUser(req.params.id);
    res.status(204).json({ message: 'Successfully deleted User!' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
