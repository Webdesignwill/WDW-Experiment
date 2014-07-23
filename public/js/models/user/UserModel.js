
define([
  'webdesignwill',
  '$topics'
],

function (webdesignwill, $topics) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    loggedin : false,

    interests : {
      logout : function () {
        this.logout();
      }
    },

    urls : {
      token : '/api/oauth/token',
      register : '/api/auth/register',
      login : '/api/auth/login',
      logout : '/api/auth/logout',
      profile : '/api/auth/profile'
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
      var self = this;
      this.url = this.urls.register;
      this.save(user, {
        wait : true,
        success : function (model, response, options) {
          self.set('loggedin', true);
          done(true);
        },
        error : function (model, response, options) {
          done(false, response.responseJSON.message[0]);
        }
      });
    },

    login : function (user, done) {
      var self = this;
      this.url = this.urls.token;
      this.save(user, {
        success : function (model, response, options) {
          self.set('loggedin', true);
          done(true);
        },
        error : function (model, response, options) {
          done(false, response.responseJSON.message[0]);
        }
      });
    },

    logout : function () {
      var self = this;
      this.url = this.urls.logout;
      $.post(this.urls.logout, function (data) {
        self.clear({silent : true});
        self.set('loggedin', false);
      });
    },

    getProfile : function (done) {
      // TODO, get the user profile stuff
      this.url = this.urls.profile;
      this.fetch({
        success : function (model, response, options) {
          done();
        },
        error : function (model, response, options) {
          alert(response.responseJSON.message[0]);
          done();
        }
      });
    }

  });

  return UserModel;

});
