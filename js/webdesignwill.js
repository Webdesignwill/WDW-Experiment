
define('webdesignwill', [
  'Backbone'
],

function (Backbone) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),

    initWebdesignwill : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.start();
        }, reset : true
      });
    },

    start : function () {
      this.router.initRouter();
      console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
    }

  });

  return new Webdesignwill();

});