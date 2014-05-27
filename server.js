
// TODO http://en.wikipedia.org/wiki/Cross-site_request_forgery
// TODO Automate removeal of temp files

var debug = require('debug')('webdesignwill'),
      express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      mongoose = require('mongoose'),
      logger = require('morgan'),
      fs = require('fs');

var app = express();

app.set('port', Number(process.env.PORT));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

//////////////
// Database //
/////////////

var mongoConnect;

if(process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  mongoConnect = 'mongodb://127.0.0.1:27017/webdesignwill';
}

if(process.env.NODE_ENV === 'production') {
  mongoConnect = process.env.MONGOLAB_URI;
}

mongoose.connect(mongoConnect);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function callback () {});

///////////
// Routes //
///////////

var pages = require('./routes/pages');
app.get('/api/page/list', pages);
app.post('/api/page/create', pages);
app.get('/api/page/get/:page_id', pages);
app.put('/api/page/put/:page_id', pages);
app.delete('/api/page/delete/:page_id', pages);

//////////////////
// start listening //
//////////////////

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});