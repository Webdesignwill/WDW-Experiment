
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
        el: $('body')
      });

      Backbone.history.start();

    },

    setRoutes : function (pageModel) {
      var self = this;

      this.route(pageModel.get('route'), pageModel.get('name'), function (option) {
        var pageType = pageModel.get('admin') ? 'admin' : 'theme';
        require([pageModel.get('page')], function (Page) {
          webdesignwill.pageManager.goto(pageModel, Page, option, pageType);
        });
      });
    },

    navigateTo : function (pageName) {
      var affix = webdesignwill.sitemap.affix;
      webdesignwill.router.navigate(webdesignwill.sitemap.get(pageName + affix).get('path'), {trigger: true});
    }

  });

  webdesignwill.router = new Router();

});