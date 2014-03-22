
define('app', [
  'Backbone',
  'appModel',
  'utils',
  'router'
], function (Backbone, appModel, utils, Router) {

  var App = function () {
    this.init = function () {

      var self = this;
      appModel.sitemap.fetch({
        success : function (model, response, options) {
          appModel.router = new Router();
          self.start();
        }, reset : true
      });

      return this;
    };

    this.start = function () {
      Backbone.history.start();
      console.log('%c The app is started ', 'background: #7AFF4D; color: #000');
    };

    this.stop = function () {
      return this;
    };

  };

  return new App();

});