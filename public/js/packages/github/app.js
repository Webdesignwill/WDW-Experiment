
define([
], function () {

  "use strict";

  var App = function () {
    this.init = function (callback) {
      console.log('%c Github has started ', 'background: #444f64; color: #FFFFFF');
      callback();
    };
  };

  var app = new App();

  return {
    init : app.init
  };

});