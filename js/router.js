
define('router', [
  'Backbone',
  'appModel',
  'PageController',
  'pagesCollection'
],

function (Backbone, appModel, PageController, pagesCollection) {

  "use strict";

  var Router = Backbone.Router.extend({

    initialize : function () {
      this.setRoutes();
      this.pageController = new PageController({
        el: $('#page-container-inner')
      });
    },

    setRoutes : function () {
      var self = this;
      pagesCollection.each(function (pageModel, index, array) {
        self.route(pageModel.get('route'), pageModel.get('name'), function (option) {
          require([pageModel.get('page')], function (Page) {
            self.pageController.goto(pageModel, Page, {option : option});
          });
        });
      });
    }

  });

  return Router;

});