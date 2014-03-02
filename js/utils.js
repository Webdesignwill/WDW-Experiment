
define('utils', [

],

function () {

  "use strict";

  var Utils = function (options) {

    this.generateTimestamp = function () {
      return Math.round(+new Date() / 1000);
    };

    this.getUrlPath = function () {
      var path = window.location.href.split('#');
      if(path[1] !== undefined && path[1].length < 1) {
        return null;
      }
      return path[1];
    };

  };

  return new Utils();

});