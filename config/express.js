
var express = require('express'),
      session = require('express-session'),
      mongoStore = require('connect-mongo')(session),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      flash = require('connect-flash');

module.exports = function (app, config, passport) {
  app.set('showStackError', true);

  app.use(express.static(config.root + '/public'));

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.enable("jsonp callback");

  app.use(cookieParser())
        .use(bodyParser());

  app.use(session({
    secret: 'webdesignwillisthebestsightintheworld',
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    })
  );

  app.use(flash())
        .use(passport.initialize())
        .use(passport.session());
};