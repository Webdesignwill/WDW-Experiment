
define('router', [
  'Backbone',
  'webdesignwill',
  'PageManager'
],

function (Backbone, webdesignwill, PageManager) {

  "use strict";

  var Router = Backbone.Router.extend({

    initRouter : function () {
      var sitemap = webdesignwill.sitemap.attributes;
      for(var key in sitemap){
        this.setRoutes(sitemap[key]);
      }

      webdesignwill.pageManager = new PageManager({
        el: $('#page-container-inner')
      });

      Backbone.history.start();

    },

    setRoutes : function (pageModel) {
      var self = this;
      this.route(pageModel.get('route'), pageModel.get('name'), function (option) {
        require([pageModel.get('page')], function (Page) {
          webdesignwill.pageManager.goto(pageModel, Page, option);
        });
      });
    }

  });

  webdesignwill.router = new Router();

});