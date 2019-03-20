const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/join', (req, res, next) => {
  res.render('join', { title: '회원 가입' });
});

router.get('/', (req, res, next) => {
  res.render('login', { title: '로그인' });
});

module.exports = router;
