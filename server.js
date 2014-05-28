
// TODO http://en.wikipedia.org/wiki/Cross-site_request_forgery
// TODO Automate removeal of temp files

var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      expressSession = require('express-session'),
      debug = require('debug')('webdesignwill'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      flash = require('connect-flash'),
      morgan = require('morgan'),
      fs = require('fs');

// App config
app.use(morgan('dev'))
      .use(bodyParser())
      .use(express.static(__dirname + '/public'))
      .use(cookieParser());

// Port vars
app.set('port', Number(process.env.PORT));

// Passport
app.use(expressSession({ secret: 'siteifyioisthebestcmseverintheworldyeah' }))
      .use(passport.initialize())
      .use(passport.session())
      .use(flash());

// Database
var confDatabase = require('./config/database');
mongoose.connect(confDatabase.local.url);

// Routes
require('./app/routes.js')(app, passport);

// Start
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});