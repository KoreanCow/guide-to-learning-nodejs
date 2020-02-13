const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const router = express.Router();

const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure api router
app.get('/', (req, res) => {
  res.render('login');
})

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  console.log(err);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('3000번 포트에서 서버대기중 ');
});

module.exports = app;


/* pug ajax file

    //- script.
    //-   $("#login").click((e) => {
    //-   e.preventDefault();
    //-   let email = $("#email").val();
    //-   let password = $("#password").val();
    //-   let nick = $("#nick").val();
    //-   $.ajax({
    //-   type: "POST",
    //-   url: "/api/auth/login",
    //-   data: { nick: nick, email: email, password: password },
    //-   dataType: "JSON",
    //-   success: () => {
    //-   console.log('통신 성공!!');
    //-   },
    //-   error: (xhr, status, error) => {
    //-   console.log(error);
    //-   }
    //-   })
    //-   })


          
//- script.
//-       $("#login").click((e) => {
//-       e.preventDefault();
//-       let email = $("#email").val();
//-       let password = $("#password").val();
//-       let nick = $("#nick").val();
//-       $.ajax({
//-       type: "POST",
//-       url: "/api/auth/login",
//-       data: { nick: nick, email: email, password: password },
//-       dataType: "JSON",
//-       success: () => {
//-       console.log('통신 성공!!');
//-       },
//-       error: (xhr, status, error) => {
//-       console.log(error);
//-       }
//-       })
//-       })

  */