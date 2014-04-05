
define('PackageManager', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.$bus = _.clone(Backbone.Events);

    this.initPackages = function (packages) {
      for(var i = 0;i<packages.length;i++) {
        this.load(packages[i]);
      }
    };

    this.load = function (pack) {
      if(webdesignwill.packages[pack]) {
        console.log('%c Github package already loaded ', 'background: #FF0000; color: #FFFFFF');
        return;
      }
      this.$bus.on(pack + ':loaded', function () {
        webdesignwill.packages[pack].init();
      }, this);
      require([pack]);
    };

    return this;

  };

  webdesignwill.packageManager = new PackageManager();

});