
define([
  'text!views/auth/templates/register.tpl'
], function (template) {

  "use strict";

  var RegisterView = Backbone.View.extend({

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return RegisterView;

});
