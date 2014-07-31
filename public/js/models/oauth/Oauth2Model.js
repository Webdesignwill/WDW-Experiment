
define([],

function () {

  "use strict";

  var Oauth2Model = Backbone.Model.extend({

    app : {
      secret : 'd2ViZGVzaWdud2lsbDp3ZWJkZXNpZ253aWxsaXN0aGViZXN0c2lnaHRpbnRoZXdvcmxk'
    },

    urls : {
      token : '/api/oauth/token'
    },

    requestAccessToken : function (user, callback) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.token,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'BASIC ' + this.app.secret
        },
        data : {
          'grant_type' : 'password',
          'username' : user.email,
          'password' : user.password
        },
        success : function (data, status) {
          this.set({
            refresh_token : data.refresh_token,
            access_token : data.access_token
          });
          callback(data, status);
        },
        error : callback
      });
    }

  });

  return new Oauth2Model();

});
