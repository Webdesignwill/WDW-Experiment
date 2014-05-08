var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger());
app.use(express.static(__dirname + '/public'));

var server = app.listen(8000, function() {
  console.log('Listening on port %d', server.address().port);
});