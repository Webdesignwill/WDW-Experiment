
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
        el: this.$pageContentInner
      });
    },

    setRoutes : function () {
      var self = this;
      pagesCollection.each(function (pageModel, index, array) {
        self.route(pageModel.get('route'), function () {
          require([pageModel.get('page')], function (ob, as) {
            self.pageController.goto(pageModel.get('page'));
          });
        });
      });
    },

    setElements : function () {
      this.$pageContentInner = $('#site-content-inner');
    }

  });

  appModel.router = new Router();

});