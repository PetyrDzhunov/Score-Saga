const { Router } = require('express');
const usersController = require('./controllers/users');
const router = Router();
router.use('/users', usersController);

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;
