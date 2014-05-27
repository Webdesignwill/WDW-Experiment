
var app = require('../app'),
      express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router(),
      Pages = require('../db/models/pages');

// Routes
router.post('/api/page/create', function (req, res) {
  var page = new Pages();

  for(var key in req.body) {
    page[key] = req.body[key];
  }

  page.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'New page created', data: page });
  });
});

// using the promise returned from executing a query LOVE
// var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
// var promise = query.exec();
// promise.addBack(function (err, docs) {});
//{sort : {'order' : 1}},

router.get('/api/page/list', function (req, res) {
  // TODO better do this on save as this makes request time longer for larger documents
  Pages.find(null, null, {sort : {'order' : 1}}, function(err, pages) {
    if (err) res.send(err);
    res.json(pages);
  });
});

router.get('/api/page/get/:page_id', function (req, res) {
  Pages.findById(req.params.page_id, function (err, page) {
    if (err) res.send(err);
    res.send(page);
  });
});

router.put('/api/page/put/:page_id', function (req, res) {
  Pages.findById(req.params.page_id, function (err, page) {
    if (err) res.send(err);

    for(var key in req.body) {
      page[key] = req.body[key];
    }

    page.save(function (err) {
      if (err) res.send(err);
      res.json(page);
    });
  });
});

router.delete('/api/page/delete/:page_id', function (req, res) {
  Pages.findByIdAndRemove(req.params.page_id, function (err) {
    if (err) res.send(err);
    res.json({ message: 'Page deleted' });
  });
});

module.exports = router;