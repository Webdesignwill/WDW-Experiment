
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
      this.setElements();
      this.pageController = new PageController({
        el: this.$pageContainerInner
      });
    },

    setElements : function () {
      this.$pageContainerInner = $('#page-container-inner');
    },

    setRoutes : function () {
      var self = this;
      pagesCollection.each(function (pageModel, index, array) {
        self.route(pageModel.get('name') + '(/)', function () {
          require([pageModel.get('page')], function (Page) {
            self.pageController.goto(pageModel, Page, {});
          });
        });
      });
    }

  });

  appModel.router = new Router();

});