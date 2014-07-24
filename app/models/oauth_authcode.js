
var mongoose = require('mongoose');

var OAuthAuthCodeSchema = new mongoose.Schema({
  authCode: {
    type: String,
    required: true,
    unique: true
  },
  clientId: String,
  userId: {
    type: String,
    required: true
  },
  expires: Date
});

module.exports.getAuthCode = function(authCode, callback) {
  console.log('*************** GET AUTH CODE ***************');
  OAuthAuthCodeModel.findOne({ authCode: authCode }, callback);
};

module.exports.saveAuthCode = function(code, clientId, expires, userId, callback) {
  console.log('*************** SAVE AUTH CODE ***************');
  var fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  OAuthAuthCodeModel.update({ authCode: code }, fields, { upsert: true }, function(err) {
    if (err) { console.error(err); }
    callback(err);
  });
};

mongoose.model('oauth_authcodes', OAuthAuthCodeSchema);
var OAuthAuthCodeModel = mongoose.model('oauth_authcodes');