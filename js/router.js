
define('router', [
  'Backbone',
  'webdesignwill',
  'PageController'
],

function (Backbone, webdesignwill, PageController) {

  "use strict";

  var Router = Backbone.Router.extend({

    initRouter : function () {
      var sitemap = webdesignwill.sitemap.attributes;
      for(var key in sitemap){
        this.setRoutes(sitemap[key]);
      }

      webdesignwill.pageController = new PageController({
        el: $('#page-container-inner')
      });

      Backbone.history.start();

    },

    setRoutes : function (pageModel) {
      var self = this;
      this.route(pageModel.get('route'), pageModel.get('name'), function (option) {
        require([pageModel.get('page')], function (Page) {
          webdesignwill.pageController.goto(pageModel, Page, option);
        });
      });
    }

  });

  webdesignwill.router = new Router();

});