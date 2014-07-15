
var Pages = require('../app/models/page');

/* Check if the user is logged in. If they are, then hit next otherwise send not authorised
======================================================= */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401, "You don't have permission to view this page");
}

module.exports = function (app, passport) {

  /* Authentication routes
  ================================================= */

  /* Login */
  app.post('/api/auth/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json(401, { message : req.flash('login') });
      }
      return res.json(200, user.local);
    })(req, res, next);
  });

  /* Register */
  app.post('/api/auth/register', function (req, res, next) {
    passport.authenticate('local-register', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json(401, { message : req.flash('register') });
      }
      return res.json(200, user.local);
    })(req, res, next);
  });

  /* ALL AUTHENTICATED ROUTES
      app.get/post(/api/auth/*, function () {})

      // Need to filter anonymous users somehow
      /*if (not logged in) {
          return res.json({ error: 'This is a secret message, login to see it.' });
      } */

  /* Logout */
  app.post('/api/auth/logout', function (req, res) {
    req.logout();
    res.json(200);
  });

  /* User profile pages and settings
  ================================================= */

  app.get('/api/auth/profile', isLoggedIn, function (req, res) {
    res.json(200, req.user);
  });

  /* Page CRUD actions
  ================================================= */

  // http://passportjs.org/guide/oauth2-api/

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
    Pages.find(null, null, {sort : {'order' : 1}}, function(err, pages) {
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