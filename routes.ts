const { Router } = require('express');
const usersController = require('./src/controllers/users-controller');
const router = Router();
// router.use('/users', usersController);

// router.get('*', (req: Request, res: Response) => {
//   res.json();
// });

module.exports = router;
