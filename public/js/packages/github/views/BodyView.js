
define([
  'text!templates/body.tpl'
], function (template) {

  "use strict";

  var BodyView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return BodyView;

});