
var mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

var OAuthUsersSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true },
  reset_token_expires: Date,
  firstname: String,
  lastname: String
});

function hashPassword(password) {
  console.log('SALT ******************************** : ', salt);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUsersSchema.static('register', function (fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new OAuthUsersModel(fields);
  user.save(cb);
});

OAuthUsersSchema.statics.getUser = function (email, password, cb) {
  OAuthUsersModel.authenticate(email, password, function (err, user) {
    if (err || !user) return cb(err);
    cb(null, user.email);
  });
};

OAuthUsersSchema.statics.authenticate = function (email, password, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) return cb(err);
    console.log('COMPARESYNC ******************************** : ', email, password);
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

mongoose.model('users', OAuthUsersSchema);

var OAuthUsersModel = mongoose.model('users');
module.exports = OAuthUsersModel;