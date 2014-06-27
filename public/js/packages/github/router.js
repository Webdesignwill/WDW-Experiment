
define([
  'app'
],

function (app) {

  "use strict";

  var Router = function () {
    this.navigate = function (pageName) {
      var pageModel = app.sitemap.get(pageName),
            templatePath = '/js/packages/github/templates/';

      app.require([pageModel.get('page')], function (Page) {
        app.pageFactory.make(templatePath, app.$sectionContent, pageModel, Page, null);
      });
    };
  };

  app.router = new Router();

});