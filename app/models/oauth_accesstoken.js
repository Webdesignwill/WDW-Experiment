
var mongoose = require('mongoose');

var OAuthAccessTokensSchema = new mongoose.Schema({
  accessToken: {
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

module.exports.getAccessToken = function(bearerToken, callback) {
  console.log('*************** GET ACCESS TOKEN ***************');
  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

module.exports.saveAccessToken = function(token, clientId, expires, userId, callback) {
  console.log('*************** SAVE ACCESS TOKEN ***************');
  var fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  OAuthAccessTokensModel.update({ accessToken: token }, fields, { upsert: true }, function(err) {
    if (err) { console.error(err); }
    callback(err);
  });
};

mongoose.model('oauth_accesstokens', OAuthAccessTokensSchema);
var OAuthAccessTokensModel = mongoose.model('oauth_accesstokens');