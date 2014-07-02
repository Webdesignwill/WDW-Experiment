
define([], function () {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    initialize : function () {},

    before : function ($dfd) {
      $dfd.resolve();
      // var self = this;
      // this.$el.animate({
      //   opacity : 1
      // }, 500, function () {

      // });
    },

    after : function ($dfd) {
      var self = this;
      this.$el.animate({
        opacity : 0
      }, 500, function () {
          $dfd.resolve();
      });
    },

    render : function () {
      this.$el.html(this.options.template);
      return this;
    }

  });

  return DefaultPage;

});
