
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var user = mongoose.Schema({
  local: {
    displayName : String,
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  github: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// methods ======================
// generating a hash
user.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Create displayName after initial regestration
user.methods.createDisplayName = function (email) {
  var name = email.split('@')[0];
  return name.replace(name[0], name[0].toUpperCase());
};

// checking if password is valid
user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', user);