
define([
  'webdesignwill',
  'PageFactory'
],

function (webdesignwill, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    init : function (module) {

      var self = this,
            pageFactory = new PageFactory(module);

      function setRoutes (pageModel) {
        var templatePath = '/js/templates/';

        self.route(pageModel.get('route'), pageModel.get('name'), function (option) {
          base_require([pageModel.get('view')], function (View) {
            pageFactory.make(templatePath, $('#site-content-body'), pageModel, View, option);
          });
        });
      }

      /* Run through the sitemap and set up a route for each page
      ====================================== */
      var sitemap = webdesignwill.sitemap.attributes;
      for(var key in sitemap){
        setRoutes(sitemap[key]);
      }

      Backbone.history.start();
    }

  });

  webdesignwill.router = new Router();

});