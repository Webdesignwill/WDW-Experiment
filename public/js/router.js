
define('router', [
  'Backbone',
  'webdesignwill',
  'PageManager'
],

function (Backbone, webdesignwill, PageManager) {

  "use strict";

  var Router = Backbone.Router.extend({

    routes : {
      '' : 'gotoHome',
      'admin/(*path)' : 'admin'
    },

    gotoHome : function () {
      this.navigateTo(this.homePage);
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
        var pageType = pageModel.get('admin') ? 'admin' : 'theme';
        require([pageModel.get('page')], function (Page) {
          webdesignwill.pageManager.goto(pageModel, Page, option, pageType);
        });
      });

      if(pageModel.get('homePage')) {
        this.homePage = pageModel.get('name');
      }

    },

    navigateTo : function (pageName) {
      var affix = webdesignwill.sitemap.affix,
            path = !pageName ? webdesignwill.sitemap.get('login' + affix).get('path') : webdesignwill.sitemap.get(pageName + affix).get('path');

      this.navigate(path, {trigger: true});
    },

    admin : function (path) {
      require('AdminPage', function (Page) {
        webdesignwill.pageManager.goto(Page);
      });
    },

    user : function (path) {
      console.log('USER PAGE : ', path);
    }

  });

  webdesignwill.router = new Router();

});