
var debug = require('debug')('webdesignwill');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var fs = require('fs');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

/////////////////////////////
// Environment configuration //
/////////////////////////////

app.set('port', 8000);

//////////////
// Database //
/////////////

mongoose.connect('mongodb://127.0.0.1:27017/webdesignwill');
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

app.get('/sitemap', function (req, res) {
  mongoose.model('pages').find(function (err, pages) {
    res.send(pages);
  });
});

//////////////////
// start listening //
//////////////////

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});