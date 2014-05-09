
var app = require('../app');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/sitemap', function (req, res) {
  mongoose.model('pages').find(function (err, pages) {
    res.send(pages);
  });
});

module.exports = router;