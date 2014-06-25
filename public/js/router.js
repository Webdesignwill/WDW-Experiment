
define([
  'Backbone',
  'webdesignwill',
  'BodyView'
],

function (Backbone, webdesignwill, BodyView) {

  "use strict";

  var Router = Backbone.Router.extend({

    routes : {
      '' : 'gotoHome'
    },

    gotoHome : function () {
      this.navigateTo('home');
    },

    init : function () {

      /* Run through the sitemap and set up a route for each page
      ====================================== */
      var sitemap = webdesignwill.sitemap.attributes;
      for(var key in sitemap){
        this.setRoutes(sitemap[key]);
      }

      /* Attach the wrapping body view
      ===================== */
      new BodyView({
        el: $('body')
      });

      Backbone.history.start();
    },

    setRoutes : function (pageModel) {
      var self = this;

      this.route(pageModel.get('route'), pageModel.get('name'), function (option) {
        base_require([pageModel.get('view')], function (View) {
          webdesignwill.pageFactory.make(pageModel, View, option);
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