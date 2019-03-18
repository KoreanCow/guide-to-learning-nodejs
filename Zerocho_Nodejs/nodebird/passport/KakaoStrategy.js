const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    const _profile = profile._json;
    try {
      const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });
      if (exUser) { // 기존에 카카오로 로그인한 사용자가 있는지 조회, 있다면 done 함수 호출
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: _profile && _profile.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
