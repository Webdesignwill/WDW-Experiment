
var express = require('express'),
      config = require('./config/config')['development'],
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
app.set('port', 5000);

require('./config/passport')(passport); // pass passport for configuration

// Passport
app.use(session({ secret: 'webdesignwillisthebestsiteintheworldyeah'}))
      .use(passport.initialize())
      .use(passport.session());

// Database
mongoose.connect(config.db);

// Routes
require('./app/routes.js')(app, passport);

// Start
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});