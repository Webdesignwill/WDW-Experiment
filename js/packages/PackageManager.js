
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
      var pge = webdesignwill.packages[pack];

      if(!pge) {
        this.setPackageListeners(pack);
        require([pack]);
      } else if (this.checkPackageActive(pack)) {
        console.log('%c ' + pack + ' already ' + webdesignwill.packages[pack].get('status') + ' ', 'background: #FF9900; color: #FFFFFF');
      }
    };

    this.setPackageListeners = function (pack) {
      this.$bus.on(pack + ':loaded', function () {
        this.setPackageStatus(pack, 'loaded');
        webdesignwill.packages[pack].init();
      }, this);
      this.$bus.on(pack + ':initialised', function () {
        this.setPackageStatus(pack, 'initialised');
        webdesignwill.packages[pack].start();
      }, this);
      this.$bus.on(pack + ':started', function () {
        this.setPackageStatus(pack, 'started');
      }, this);
      this.$bus.on(pack + ':stopped', function () {
        this.setPackageStatus(pack, 'stopped');
        webdesignwill.packages[pack].stop();
      }, this);
    };

    this.setPackageStatus = function (pack, status) {
      webdesignwill.packages[pack].set('status', status);
    };

    this.checkPackageActive = function (pack) {
      var pge = webdesignwill.packages[pack];
      return pge.get('status') === 'loaded' || 'started' ? true : false;
    };

    return this;

  };

  webdesignwill.packageManager = new PackageManager();

});