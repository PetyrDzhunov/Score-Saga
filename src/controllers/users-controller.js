const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
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
    const user = await getOneUser(req.params.id);
    res.status(200).json(user);
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

router.post('/', async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    const newUser = await createUser(username, email, password, avatar);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteOneUser(req.params.id);
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
