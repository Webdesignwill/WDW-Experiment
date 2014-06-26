
define([], function () {

  "use strict";

  var App = function () {

    this.init = function (done) {
      done();
    };
    this.continue = function (done) {
      done();
    };
  };

  return new App();

});