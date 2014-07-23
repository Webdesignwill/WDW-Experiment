
var mongoose = require('mongoose'),
      authorizedClientIds = ['webdesignwill'];

var OAuthClientsSchema = new mongoose.Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String
});

OAuthClientsSchema.statics.getClient = function (clientId, clientSecret, callback) {
  var params = { clientId : clientId };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  OAuthClientsModel.findOne(params, callback);
};

OAuthClientsSchema.statics.grantTypeAllowed = function (clientId, grantType, callback) {
  if (grantType === 'password' || grantType === 'authorization_code') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }
  callback(false, true);
};

mongoose.model('oauth_clients', OAuthClientsSchema);
var OAuthClientsModel = mongoose.model('oauth_clients');
module.exports = OAuthClientsModel;