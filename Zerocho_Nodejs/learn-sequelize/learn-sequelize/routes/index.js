const express = require('express');
// eslint-disable-next-line prefer-destructuring
const User = require('../models').User;

const router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render('sequelize', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
//        async/await 문법으로 표현한 라우터
// router.get('/', async (req, res, next) => {
//   try{
//     const users = await User.findAll();
//     res.render('sequelize', { users });
//   }catch (error) {
//     console.error(error);
//     next(error);
//   }
// })
