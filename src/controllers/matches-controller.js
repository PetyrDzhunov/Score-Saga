const express = require('express');
const router = express.Router();
const { getAllMatches, getOneMatch } = require('../services/match-service');
const authenticationMiddleware = require('../middlewares/auth-middleware');

router.get('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const allMatches = await getAllMatches();
    res.status(201).json(allMatches);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticationMiddleware, async (req, res, next) => {
  try {
    const singleMatch = await getOneMatch(req.params.id);
    res.status(201).json(singleMatch);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
