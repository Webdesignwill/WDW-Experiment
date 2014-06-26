
define([
  'Sitemap'
], function (Sitemap) {

  "use strict";

  var App = function () {

    this.init = function (done) {
      new Sitemap().fetch({
        success : function (model, response, options) {
          done();
        }
      });
    };
    this.continue = function (done) {
      done();
    };
  };

  return new App();

});