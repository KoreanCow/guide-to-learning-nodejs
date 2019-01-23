var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//    pug쓸 땐 pug   ejs쓸 땐 ejs

app.use(function(req, res, next) {
  console.log(req.url, '저도 미들웨어입니다');
  next();
});

app.use(logger('dev'));   //개발시 short, dev자주 사용 || 배포시 common, combine 자주사용
app.use(express.static(path.join(__dirname, 'public'))); 
//정적인 파일들 제공 || public/stylesheets/style.css는 http://localhost:3000/stylesheet/style.css로 접근 가능 -> 서버의 폴더 경로와 요청 경로가 다르므로 외부인이
//서버의 구조를 쉽게 파악할 수 없음 -> 보안에 도움
//정적인 파일 알아서 제공 fs.readFile로 직접 읽어서 전송할 필요가 없다. -> morgan 등 미들웨어 보다 더 위로 올리면 정적파일 요청 기록X   -> 자신의 서비스 맞는 위치 선택
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //bodyparser의 일부 기능 || 요청의 본문 해석, 폼 데이터나 AJAX요청의 데이터를 처리

app.use(cookieParser('secret code'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use('/', indexRouter);            //주소가 /로시작하면 route/index.js 호출
app.use('/users', usersRouter);       //주소가 /users로 시작하면 routes/users.js 호출

//  404처리 미들웨어
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;