
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/users', function (req, res) {
  console.log('Get the user : ', req, res);
});

router.post('/users', function (req, res) {

});

module.exports = router;