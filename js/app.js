
define('app', [
  'Backbone',
  'appModel',
  'pagesCollection',
  'utils',
  'router'
], function (Backbone, appModel, pagesCollection, utils, Router) {

  var App = function () {
    this.init = function () {

      var self = this;

      pagesCollection.fetch({reset: true});
      pagesCollection.on('reset', function () {
        appModel.router = new Router();
        Backbone.history.start();
        self.start();
      }, {parse : true});
      return this;
    };

    this.start = function () {
      appModel.broker.trigger('app:started');
      console.log('%c The app is started ', 'background: #7AFF4D; color: #000');
    };

    this.stop = function () {
      return this;
    };

  };

  return new App();

});