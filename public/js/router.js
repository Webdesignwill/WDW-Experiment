
define([
  'Backbone',
  'webdesignwill',
  'PageManager'
],

function (Backbone, webdesignwill, PageManager) {

  "use strict";

  var Router = Backbone.Router.extend({

    routes : {
      '' : 'gotoHome'
    },

    gotoHome : function () {
      this.navigateTo('home');
    },

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
        require([pageModel.get('page')], function (Page) {
          webdesignwill.pageManager.goto(pageModel, Page, option);
        });
      });

    },

    navigateTo : function (pageName) {

      var affix = webdesignwill.sitemap.affix,
            path = !pageName ? webdesignwill.sitemap.get('home' + affix).get('path') : webdesignwill.sitemap.get(pageName + affix).get('path');

      this.navigate(path, {trigger: true});
    }

  });

  webdesignwill.router = new Router();

});