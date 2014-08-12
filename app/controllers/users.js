
var User = require('./../models').User,
      Oauth = require('./../models/oauth');

function parseUserObject (user) {
  return {
    id : user._id,
    email : user.email,
    displayname : user.displayname,
    firstname : user.firstname,
    lastname : user.lastname,
    company : user.company,
    loggedin : true
  };
}

/* Return all users
============================= */
module.exports.all = function (req, res) {
  User.find(null, null, {sort : {'order' : 1}}, function (err, users) {
    if (err) res.send(err);

    var i = 0, parsedUsers = [];
    for(i; i<users.length; i++) {
      parsedUsers.push(parseUserObject(users[i]));
    }
    res.send(200, parsedUsers);
  });
};