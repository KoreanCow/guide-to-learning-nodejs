const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
// const pasport = require('passport');

require('dotenv').config();

const pageRouter = require('./routes/page');

const { sequelize } = require('./models');

const app = express();
sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

app.use(morgan('dev')); // 로그를 남기는 모듈
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(flash());
app.use('/', pageRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  console.log(err);
  err.status = 404;
  next(err);
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
