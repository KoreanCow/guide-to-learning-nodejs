const local = require('./localStrategy');
const kakao = require('./KakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { // serializeUser는 req.session 객체에 어떤 데이터를 저장할지 선택
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { // deserializeUser 는 매 요청 시 실행
    User.find({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
// serializeUser에서 user.id를 세션에 저장
// deserializeUser 에서 조회 후 정보를 req.user에 저장
// 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.
