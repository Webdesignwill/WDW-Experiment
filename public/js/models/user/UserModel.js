
define([
  'oauth2Model',
  '$topics'
],

function (oauth2Model, $topics) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    defaults : {
      loggedin : false
    },

    interests : {
      logout : function () {
        this.logout();
      }
    },

    urls : {
      register : '/api/user/register',
      login : '/api/user/login',
      logout : '/api/user/logout',
      profile : '/api/user/me',
      session : '/api/user/session'
    },

    initialize : function () {
      this.setSubscriptions();
    },

    setSubscriptions : function () {
      $topics.setSubscriptions({
        channel : 'user',
        events : this.interests
      }, this);
    },

    register : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.register,
        contentType : 'application/x-www-form-urlencoded',
        data : {
          email : user.email,
          displayname : user.displayname,
          password : user.password
        },
        success : function (data, status) {
          done(true);
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    },

    login : function (user, done) {
      var self = this;
      oauth2Model.requestAccessToken(user, function (data, status) {
        if (status === 'success') {
          self.startSession(user, function () {
            done(true);
          });
        } else if (status === 'error') {
          done(false, data, status);
        }
      });
    },

    logout : function () {
      var self = this;
      this.url = this.urls.logout;
      $.post(this.urls.logout, function (data) {
        self.clear({silent : true});
        self.set(data);
      });
    },

    startSession : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.session,
        contentType : 'application/x-www-form-urlencoded',
        data : {
          email : user.email,
          password : user.password
        },
        success : function (data, status) {
          this.set(data);
          done();
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    },

    getProfile : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.profile,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + oauth2Model.get('access_token')
        },
        success : function (data, status) {
          this.set(data);
          done();
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    }

  });

  return UserModel;

});
