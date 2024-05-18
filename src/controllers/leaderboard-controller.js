const express = require('express');
const router = express.Router();
const { getLeaderboardUsers } = require('../services/leaderboard-service');
const authenticationMiddleware = require('../middlewares/auth-middleware');

router.get('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const leaderboardUsers = await getLeaderboardUsers();
    res.status(200).json(leaderboardUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
