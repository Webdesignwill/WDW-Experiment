
var Controllers = require('./../app/controllers');

module.exports = function (app) {

  /* Oauth
  ==================================== */
  app.post('/api/oauth/token', app.oauth.grant());

  /* User
  ==================================== */
  app.post('/api/user/session', Controllers.User.session);
  app.post('/api/user/register', Controllers.User.register);
  app.get('/api/user/me', app.oauth.authorise(), Controllers.User.getMe);
  app.delete('/api/user/me', app.oauth.authorise(), Controllers.User.deleteMe);
  app.put('/api/user/me', app.oauth.authorise(), Controllers.User.putMe);
  app.post('/api/user/logout', Controllers.User.logout);

  /* Users
  ==================================== */
  app.get('/api/users/all', Controllers.Users.all);

  /* Page
  ==================================== */

  /* Create a new page */
  app.post('/api/page/create', function (req, res) {
    var page = new Pages();

    for(var key in req.body) {
      page[key] = req.body[key];
    }

    page.save(function(err) {
      if (err) res.send(err);
      res.json({
        success: 'New page created',
        data: page
      });
    });
  });

  /* List all pages */
  app.get('/api/page/list', function (req, res) {
    Pages.find(null, null, {sort : {'order' : 1}}, function (err, pages) {
      if (err) res.send(err);
      res.json(pages);
    });
  });

  /* Get specific page by ID */
  app.get('/api/page/get/:page_id', function (req, res) {
    Pages.findById(req.params.page_id, function (err, page) {
      if (err) res.send(err);
      res.send(page);
    });
  });

  /* Update a page by ID */
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

  /* Delete a page by ID */
  app.delete('/api/page/delete/:page_id', function (req, res) {
    Pages.findByIdAndRemove(req.params.page_id, function (err) {
      if (err) res.send(err);
      res.json({success: 'Page deleted'});
    });
  });

};