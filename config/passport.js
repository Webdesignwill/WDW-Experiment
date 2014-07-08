
var LocalStrategy = require('passport-local').Strategy,
      User = require('../app/models/user');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL REGISTER ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for register
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-register', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
      process.nextTick(function() {
        User.findOne({
          'local.email': email
        }, function (err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, false, req.flash('registerMessage', 'That email is already taken.'));
          } else {
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function (err) {
              if (err) throw err;
              return done(null, newUser, req.flash('registerMessage', 'Welcome.'));
            });
          }
        });
      });
    }));
};