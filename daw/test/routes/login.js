const express = require('express');
const models = require('../models');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: '로그인' });
});


module.exports = router;
