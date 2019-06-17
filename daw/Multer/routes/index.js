const express = require('express');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'upload/' });

router.get('/', (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.single('userfile'), (req, res) => {
  res.send(`Uploaded! : ${req.file}`);
  console.log(req.file);
});

module.exports = router;
