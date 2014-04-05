
define('Github', [
  'Backbone',
  'webdesignwill',
  'gh_SigninPage'
], function (Backbone, webdesignwill, SigninPage) {

  var Github = Backbone.Model.extend({

    init : function () {
      console.log('%c Github package initialising ', 'background: #0033FF; color: #FFF');
      var self = this;
      setTimeout(function () {
        self.start();
      }, 1200);
    },

    start : function () {
      console.log('%c Github package has started ', 'background: #7AFF4D; color: #000');
    },

    stop : function () {
      console.log('%c Github package has stopped ', 'background: #000000; color: #FFFFFF');
    }

  });

  webdesignwill.packages.github = new Github();

});