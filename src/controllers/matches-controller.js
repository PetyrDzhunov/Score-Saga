const express = require('express');
const router = express.Router();
const { getNextFixtures } = require('../services/match-service');

router.get('/', async (req, res, next) => {
  try {
    const { success } = await getNextFixtures();
    if (success) {
      res
        .status(200)
        .json({ message: 'Fixtures successfully retrieved and saved.' });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to retrieve and save fixtures.' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
