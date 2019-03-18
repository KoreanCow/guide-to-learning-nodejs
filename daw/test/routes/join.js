const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('join', { title: '회원 가입' });
});

module.exports = router;
