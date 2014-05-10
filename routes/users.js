
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/users', function (req, res) {
  mongoose.model('users').find(function (err, users) {
    res.send(users);
  });
});

router.post('/users', function (req, res) {

});

module.exports = router;