
define([
  'text!views/auth/templates/login.tpl'
], function (template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return LoginView;

});
