
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/login.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    tagName : 'form',
    className : 'login-form',
    events : {
      'submit' : 'handler'
    },

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      webdesignwill.user.login({
        email : this.el.email.value,
        password : this.el.password.value
      }, function (result, data, status) {
        if(result) { return $topics.publish('modal:close'); }
        alert('USER NOT FOUND');
      });
    }
  });

  return LoginView;

});
