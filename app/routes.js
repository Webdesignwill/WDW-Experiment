
var Pages = require('../app/models/page');

module.exports = function (app, passport) {

  app.all('*', function (req, res, err) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    next(); // Defer to the next middleware
  });

  app.post('/api/page/create', function (req, res) {
    var page = new Pages();

    for(var key in req.body) {
      page[key] = req.body[key];
    }

    page.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'New page created', data: page });
    });
  });

  app.get('/api/page/list', function (req, res) {
    Pages.find(null, null, {sort : {'order' : 1}}, function(err, pages) {
      if (err) res.send(err);
      res.json(pages);
    });
  });

  app.get('/api/page/get/:page_id', function (req, res) {
    Pages.findById(req.params.page_id, function (err, page) {
      if (err) res.send(err);
      res.send(page);
    });
  });

  app.put('/api/page/put/:page_id', function (req, res) {
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

  app.delete('/api/page/delete/:page_id', function (req, res) {
    Pages.findByIdAndRemove(req.params.page_id, function (err) {
      if (err) res.send(err);
      res.json({ message: 'Page deleted' });
    });
  });

};