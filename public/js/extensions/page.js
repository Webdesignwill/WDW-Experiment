
define([
  'Backbone'
], function (Backbone) {

  "use strict";

  Backbone.Page = Backbone.View.extend({

    constructor : function () {
      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    opacity : function (opacity, callback) {
      this.$el.velocity({
        opacity : opacity
      }, 420, callback);
    },

    before : function ($container, $dfd) {
      this.$el.css('opacity', 0);
      this.opacity(1, function () {
        $dfd.resolve();
      });
    },

    after : function ($dfd) {
      this.opacity(0, function () {
        $dfd.resolve();
      });
    },

    close : function () {
      this.$el.off().remove();
    }

  });

});