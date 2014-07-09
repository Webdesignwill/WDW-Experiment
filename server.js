
var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      debug = require('debug')('webdesignwill'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      flash = require('connect-flash'),
      morgan = require('morgan'),
      fs = require('fs');

// App config
app.use(morgan('dev'))
      .use(flash())
      .use(cookieParser())
      .use(bodyParser())
      .use(express.static(__dirname + '/public'))
      .use(cookieParser());

// Port vars
app.set('port', 5000)
      .set('view engine', 'ejs'); // set up ejs for templating. Not sure if I need this still

require('./config/passport')(passport); // pass passport for configuration

// Passport
app.use(session({ secret: 'webdesignwillisthebestsiteintheworldyeah' }))
      .use(passport.initialize())
      .use(passport.session());

// Database
var confDatabase = require('./config/database');
mongoose.connect(confDatabase.local.url);

// Routes
require('./app/routes.js')(app, passport);

// Start
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});