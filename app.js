
// TODO http://en.wikipedia.org/wiki/Cross-site_request_forgery
// TODO Automate removeal of temp files

var debug = require('debug')('webdesignwill'),
      express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      logger = require('morgan'),
      fs = require('fs');

var app = express();

app.set('port', 8000);
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

//////////////
// Database //
/////////////

var mongoUrl = process.env.MONGOLAB_URI || '127.0.0.1:27017';
mongoose.connect('mongodb://' + mongoUrl + '/webdesignwill');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function callback () {
  fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
    require(__dirname + '/db/models/' + filename);
  });
});

///////////
// Routes //
///////////


// Sitemap
var sitemap = require('./routes/sitemap');
app.get('/sitemap', sitemap);

// Users
var users = require('./routes/users');
app.get('/users', users);
app.post('/users', users);

//////////////////
// start listening //
//////////////////

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});