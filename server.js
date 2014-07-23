
var express = require('express'),
      debug = require('debug')('webdesignwill'),
      passport = require('passport'),
      fs = require('fs');

var env = process.env.NODE_ENV || 'development',
      config = require('./config/config')[env],
      mongoose = require('mongoose'),
      models = require('./app/models');

// Database
mongoose.connect(config.db);

// Passport settings
require('./config/passport')(config, passport);

var app = express();

// express settings
require('./config/express')(app, config, passport);

// express settings
require('./config/routes')(app, passport);

// Start
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});


oauth2server = require('node-oauth2-server');

/* OAUTH PROTOTYPE
============================== */
app.oauth = oauth2server({
  model: models.oauth,
  grants: ['password', 'authorization_code', 'refresh_token'],
  debug: true
});

app.post('/api/oauth/token', app.oauth.grant());

//expose app
exports = module.exports = app;