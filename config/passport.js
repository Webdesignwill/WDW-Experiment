
var LocalStrategy = require('passport-local').Strategy,
      User = require('../app/models/user');

module.exports = function (config, passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  /* Register strategy
  ================================================ */
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    process.nextTick(function () {
      User.findOne( {'local.email': email }, function (err, user, info) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, req.flash('register', 'Email already exists'));
        } else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.displayName = newUser.createDisplayName(email);
          newUser.save(function (err) {
            if (err) { throw err; }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  /* Login strategy
  ================================================ */
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function (req, email, password, done) {
    User.findOne({ 'local.email' :  email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('login', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('login', 'Oops! Wrong password.'));
      }
      return done(null, user);
    });
  }));
};