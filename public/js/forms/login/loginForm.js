
define([
  'text!login/templates/login.tpl'
], function (template) {

  "use strict";

  var LoginForm = Backbone.Forms.extend({

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return LoginForm;

});