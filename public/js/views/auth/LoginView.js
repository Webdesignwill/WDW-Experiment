
define([
  'LoginModel',
  'text!views/auth/templates/login.tpl'
], function (LoginModel, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    tagName : 'form',
    className : 'login-form',

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return LoginView;

});
