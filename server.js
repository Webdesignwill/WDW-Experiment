
var express = require('express'),
      debug = require('debug')('webdesignwill'),
      passport = require('passport'),
      fs = require('fs');

var env = process.env.NODE_ENV || 'development',
      config = require('./config/config')[env],
      mongoose = require('mongoose');

// Database
mongoose.connect(config.db);

// Load all models models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + '/' + file);
});

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

//expose app
exports = module.exports = app;