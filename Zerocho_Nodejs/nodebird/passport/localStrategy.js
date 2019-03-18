const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');
// ex를 passport.authenticate('local', (authError, user, info) => {})로 지정
module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.find({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser); // ex에서 authError: null , user: exUser 대입됨 -> 로그인 성고
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); // ex에서 authError: null, user: false, info: {message: ~} 대입됨 -> 로그인 실패
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' }); // 위와 동일
      }
    } catch (error) {
      console.error(error);
      done(error); // ex에서 authError: done(error) -> 서버에러시, 에러처리
    }
  }));
};
