var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var fileUpload = require('express-fileupload')
require('dotenv').config()
const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')
const cors = require('cors')

hbs.registerHelper('eq', function (a, b) {
  return a == b
})
var indexRouter = require('./routes/index')

var app = express()
var registerRouter = require('./routes/admin/register')

var loginRouter = require('./routes/admin/login')
var contactRouter = require('./routes/contact')

var profileRouter = require('./routes/admin/myProfile')
var moviesRouter = require('./routes/movies')

var novedadesRouter = require('./routes/admin/novedades')
const sessionRouter = require('./routes/admin/session')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(logger('dev'))
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'EX2021awqyeudj', resave: false, saveUninitialized: true }))
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario)
    if (req.session.id_usuario) {
      next()
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error)
  }
}
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)
app.use((req, res, next) => {
  res.locals.nombre = req.session.nombre
  res.locals.rol = req.session.rol
  next()
})

app.use('/register', registerRouter)
app.use('/session', sessionRouter)
app.use('/', indexRouter)
app.use('/admin/login', loginRouter)
app.use('/admin/myProfile', profileRouter)
app.use('/movies', moviesRouter)
app.use('/', contactRouter)
app.use('/admin/novedades', secured, novedadesRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
