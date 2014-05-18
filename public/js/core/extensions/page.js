
define('page', [
    'Backbone',
    'webdesignwill'
], function (Backbone, webdesignwill) {

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