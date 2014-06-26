
define([
], function () {

  "use strict";

  var App = function () {
    this.init = function (options) {
      options.done();
    };
    this.continue = function (options) {
      options.done();
    };
  };

  var app = new App();

  return {
    init : app.init,
    continue : app.continue
  };

});