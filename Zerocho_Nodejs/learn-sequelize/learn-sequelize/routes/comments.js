const express = require('express');
const { User, Comment } = require('../models');

const router = express.Router();

//          async/await 형식
router.get('/:id', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Comment.update({ comment: req.body.comment },
      { where: { id: req.params.id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = Comment.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

//    promise 형식
// router.get('/:id', function(req, res, next) {
//   Comment.findAll({
//     include: {
//       model: User,
//       where: { id: req.params.id },
//     },
//   })
//     .then((comments) => {
//       console.log(comments);
//       res.json(comments);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

// router.post('/', function(req, res, next) {
//   Comment.create({
//     commenter: req.body.id,
//     comment: req.body.comment,
//   })
//     .then((result) => {
//       console.log(result);
//       res.status(201).json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

// router.patch('/:id', function(req, res, next) {
//   Comment.update({ comment: req.body.comment }, { where: { id: req.params.id } })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

// router.delete('/:id', function(req, res, next) {
//   Comment.destroy({ where: { id: req.params.id } })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });
