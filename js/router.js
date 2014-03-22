
define('router', [
  'Backbone',
  'appModel',
  'PageController'
],

function (Backbone, appModel, PageController) {

  "use strict";

  var Router = Backbone.Router.extend({

    initialize : function () {
      this.loopSitemap();
      this.pageController = new PageController({
        el: $('#page-container-inner')
      });
    },

    loopSitemap : function () {
      var sitemap = appModel.sitemap.attributes;
      for(var key in sitemap){
        this.setRoutes(sitemap[key]);
      }
    },

    setRoutes : function (pageModel) {
      var self = this;
      this.route(pageModel.get('route'), pageModel.get('name'), function (option) {
        require([pageModel.get('page')], function (Page) {
          self.pageController.goto(pageModel, Page, option);
        });
      });
    }

  });

  return Router;

});