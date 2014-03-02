
define('page', [
    'Backbone'
], function (Backbone) {

  "use strict";

  Backbone.Page = Backbone.View.extend({

    constructor : function () {
      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    close : function () {
      this.$el.off().remove();
    }

  });

});