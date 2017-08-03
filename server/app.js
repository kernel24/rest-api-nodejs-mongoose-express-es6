import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import index from './routes/index'
import users from './routes/users'
import preferences from './routes/preferences'

const app = express()

// Configure session
import session from 'express-session'
app.use(session({
    secret: '$#@!TaskWorld!@#$',
    resave: false,
    saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.set('port', process.env.PORT || 8080)

const server = app.listen(app.get('port'), () => {
  console.log('Ready on port ' + server.address().port)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/users', users)
app.use('/preferences', preferences)

// Configure mongoose
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')
var db = mongoose.connection
db.on('error',console.error)
db.once('open',() => {
  console.log("Conntected to mongod server")
})

var connection = mongoose.connect('mongodb://localhost/taskworld',{
    useMongoClient: true,
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
