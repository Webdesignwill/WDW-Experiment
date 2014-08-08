
var Pages = require('./../app/models').Page,
      User = require('./../app/models').User,
      Oauth = require('./../app/models/oauth');

module.exports = function (app) {

  /* Login for an hour */
  app.post('/api/oauth/token', app.oauth.grant());
  app.post('/api/user/session', function (req, res, next) {
    User.authenticate(req.body.email, req.body.password, function (err, user) {
      if (err) return next(err);
      if(user) {
        req.session.userId = user.email;
        res.send(200, {id : user._id, email : user.email, displayname : user.displayname, loggedin : true });
      } else {
        res.send(401, { message : 'Not authorised'} );
      }
    });
  });

  /* Register */
  app.post('/api/user/register', function (req, res, next) {
    User.register(req.body, function (err, user) {
      if (err) return next(err);
      res.send(200, { message: 'New user created' } );
    });
  });

  app.get('/api/user/me', app.oauth.authorise(), function (req, res) {
    User.findOne({ email : req.user.id }, function (err, user) {
      if (err) res.send(err);
      res.send(200, { id : user._id, email : user.email, displayname : user.displayname });
    });
  });

  app.get('/api/user/list', function (req, res) {
    /* Only display displayable stuff like name, email etc */
    User.find(null, null, {sort : {'order' : 1}}, function (err, users) {
      if (err) res.send(err);
      res.send(200, users);
    });
  });

  app.post('/api/user/logout', function (req, res) {
    Oauth.deleteAccessToken(req, function () {
      Oauth.deleteRefreshToken(req, function () {
        User.logout(req, function () {
          res.send(200, {loggedin : false});
        });
      });
    });
  });

  /* Page CRUD actions
  ================================================= */

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