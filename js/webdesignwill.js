
define('webdesignwill', [
  'Backbone'
],

function (Backbone) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    packages : {},

    initialize : function () {
      this.setDefaults();
      this.setBroker();
      this.setEvents();
    },

    setDefaults : function () {
      this.set('currentPage', {});
    },

    setBroker : function () {
      this.broker = _.clone(Backbone.Events);
    },

    setEvents : function () {
      var self = this;
      this.on('change:currentPage', function (webdesignwill) {
        // Not sure what to do here yet
      });
    },

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