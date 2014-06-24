
define(['Backbone'],

function (Backbone) {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html(this.options.template);
      this.options.$container.html(this.el);
      return this;
    }

  });

  return DefaultPage;

});
