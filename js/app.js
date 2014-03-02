
define('app', [
  'Backbone',
  'appModel',
  'utils'
], function (Backbone, appModel, utils) {

  var App = function () {
    this.init = function () {
      Backbone.history.start();
      this.start();
      return this;
    };

    this.start = function () {
      var path = utils.getUrlPath() || '/';
      appModel.router.navigate(path, {trigger: true});
      appModel.broker.trigger('app:started');
      console.log('%c The app is started ', 'background: #7AFF4D; color: #000');
    };

    this.stop = function () {
      return this;
    };

  };

  return new App();

});