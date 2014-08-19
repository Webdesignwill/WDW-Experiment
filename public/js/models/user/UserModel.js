
define([
  'oauth2Model',
  '$topics'
],

function (oauth2Model, $topics) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    defaults : { loggedin : false },

    interests : {
      logout : function () {
        this.logout();
      }
    },

    urls : {
      register : '/api/user/register',
      login : '/api/user/login',
      logout : '/api/user/logout',
      me : '/api/user/me',
      session : '/api/user/session'
    },

    initialize : function () {
      this.setSubscriptions();
    },

    clearUser : function () {
      this.clear({silent : true});
      this.set(this.defaults);
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
        data : user,
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
      $.post(this.urls.logout, function (data) {
        self.clearUser();
      });
    },

    startSession : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.session,
        contentType : 'application/x-www-form-urlencoded',
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true);
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    },

    getProfile : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + oauth2Model.get('access_token')
        },
        success : function (data, status) {
          this.set(data);
          done(true);
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    },

    put : function (user, done) {
      $.ajax({
        type : 'PUT',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + oauth2Model.get('access_token')
        },
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true);
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    },

    deleteMe : function (done) {
      $.ajax({
        type : 'DELETE',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + oauth2Model.get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
          done(true);
        },
        error : function () { alert('HANDLE ERROR'); }
      });
    }

  });

  return UserModel;

});
