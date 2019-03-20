const express = require('express');
// const passport = require('passport');
const { user } = require('../models');

const router = express.Router();

router.get('/join', (req, res) => res.render('join', { title: '회원 가입' }));


router.get('/', (req, res) => res.render('login', { title: '로그인' }));

router.post('/join', (req, res) => {
  const { email, nick, password } = req.body;
  console.log(req.body);
  res.render('login', {
    title: '로그인',
    user: req.body,
    joinError: req.flash('joinError'),
  });
});

router.post('/join', async (req, res) => {
  try {
    const exUser = await user.find({ where: { email } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
    }
    await user.create({
      email,
      nick,
      password,
    });
    return res.redirect('/');
  } catch(error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
