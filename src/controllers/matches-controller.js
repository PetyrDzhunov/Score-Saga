const express = require('express');
const router = express.Router();
const { getAllMatches } = require('../services/match-service');
const authenticationMiddleware = require('../middlewares/auth-middleware');

router.get('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const allMatches = await getAllMatches();
    res.status(201).json(allMatches);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
