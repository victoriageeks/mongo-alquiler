require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apartmentsRouter = require('./routes/apartments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apartment', apartmentsRouter);

app.get('/', (req, res) => {
  res.redirect('/apartment');
})

// Renderizar el formulario de login
app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/checkAuth', (req, res) => {
  // Miramos si el usuario ha puesto "la palabra secrecta"
  if (req.body.password == "admin") {
    // Establecemos que el usuario conoce la palabra secreta mediante una cookie, y lo indetificamos como amdin. Obviamente, esto tendria que estar encriptado para mayor seguridad, o usando paquete de terceros para hacer una autentificación más profesional. maxAge nos dice que está cookie pasará a ser inválida al cabo 1 hora
    res.cookie("user", "admin", { maxAge: 3600000 })
    return res.redirect('/')
  }

  // Código HTTP para informar que el usuario no está autorizado
  res.status(401).send("Password incorrecto");

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
