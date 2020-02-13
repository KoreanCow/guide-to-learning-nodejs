
const jwt = require('jsonwebtoken');
const bkdf2Password = require('pbkdf2-password');
const alert = require('alert-node');
const User = require('../../../models/users');

const hasher = bkdf2Password();
/*
    POST /api/auth.register
    {
        email,
        nick,
        password,
    }
*/

exports.register = (req, res) => {
  const { email, nick, password } = req.body;
  const exUser = User.findOne({ where: { email } });
  if (!exUser) {
    hasher({ password }, (err, pass, salt, hash) => {
      User.create({
        nick,
        email,
        password: hash,
        salt,
      }).then((result) => {
        res.send('index');
      }).catch((error) => {
        console.log(error);
      });
    });
  } else {
    console.log('이메일 중복');
  }
};

/*
    Post /api/auth/login
    {
      email,
      nick,
      password,
    }
*/

exports.login = (req, res) => {
  const { email, nick, password } = req.body;
  User.findOne(
    { where: { email } },
  ).then((result) => {
    const dbPassword = result.dataValues.password;
    const salt = result.dataValues.salt;

    const hashPassword = hasher({ password, salt: result.salt }, (err, pass, salt, hash) => {
      if (dbPassword === hash) {
        alert('로그인 성공, 토큰 발급');
        const user = {
          nick,
          email,
          hash,
        };
        jwt.sign({ user }, 'serectkey', { expiresIn: '20s' }, (err, token) => {
          res.json({
            token,
          });
        });
      } else {
        console.log('비밀번호 불일치');
        alert('비밀번호 불일치');
      }
    });
  }).catch((err) => {
    console.log(err);
  });
};
