const router = require('express').Router();

const controller = require('./auth.controller');

router.get('/register', (req, res) => {
  // res.send('dsa');
  res.render('join');
});

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
