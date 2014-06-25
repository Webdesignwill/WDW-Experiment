
define([
], function () {

  "use strict";

  var App = function () {
    this.init = function (options) {
      console.log('%c Twitch has started ', 'background: #444f64; color: #FFFFFF');
      options.callback();
    };
  };

  var app = new App();

  return {
    init : app.init
  };

});