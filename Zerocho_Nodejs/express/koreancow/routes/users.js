var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/flash', function(req, res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result');    // /users/flash/result 사용자를 이 주소로 리다이렉션 해줌 -> 보내줌 
})
//req.flash(키, 값);
router.get('/flash/result', function(req, res){
  res.send(`${req.session.message} ${req.flash('message')}`); //    새로고침시 req.flash('messsage')가 사라짐 -> flash 는 일회용
});
//일화성 메시지라는 설징을 이용하여 로그인 에러 회원가입 에러샅은 경고 메시지를 flash 미들웨어로 처리하면 좋다.

//router.get('/user/:id', fucntion(req, res){
//    console.log(req.params, req.query);
// });
//  /users/123?limit=5&skip=10   -> console : {id: '123'}{limit: '5', skip: '10'};      와일드카드역할 -> 일반 라우터 보다 뒤에 위치
module.exports = router;