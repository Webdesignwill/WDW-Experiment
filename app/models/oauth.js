
var AuthCode = require('./oauth_authcode'),
      AccessToken = require('./oauth_accesstoken'),
      RefreshToken = require('./oauth_refreshtoken'),
      User = require('./user'),
      Client = require('./oauth_client');


/* oauth2 API
========================================== */

// Always required
module.exports.getAccessToken = AccessToken.getAccessToken;

// Password grant type
module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;
module.exports.getUser = User.getUser;
module.exports.saveAccessToken = AccessToken.saveAccessToken;

// Authorization code grant type
module.exports.getAuthCode = AuthCode.getAuthCode;
module.exports.saveAuthCode = AuthCode.saveAuthCode;

// Refresh token grant type
module.exports.getRefreshToken = RefreshToken.getRefreshToken;
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken; // Also required for password grant type