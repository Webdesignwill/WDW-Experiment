
define([], function () {

  "use strict";

  var App = function () {

    this.dependencies = [{
      method : function ($dfd) {
        $dfd.resolve();
      }
    }];

    this.launch = function (done) {
      done();
    };
    this.continue = function (done) {
      done();
    };
  };

  return new App();

});