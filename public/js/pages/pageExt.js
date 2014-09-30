
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
        opacity : opacity,
        mobileHA: true
      }, 420, callback);
    },

    before : function ($container, $dfd) {
      this.$el.css('opacity', 0);
      this.opacity(1, function () {
        $dfd.resolve();
      });
    },

    close : function ($dfd) {
      var self = this;
      this.opacity(0, function () {
        self.$el.off().remove();
        $dfd.resolve();
      });
    }

  });

});