
define('PackageManager', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.interests = {
      loaded : function (data) {
        webdesignwill.packages[data.pack].init();
      },
      initialised : function (data) {
        webdesignwill.packages[data.pack].start();
      },
      started : function (data) {
        // No calllback for started yet
      },
      stopped : function (data) {
        webdesignwill.packages[data.pack].stop();
      }
    };

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

      var self = this;

      function handle (data) {
        self.setPackageStatus(data.pack, data.type);
        self.interests[data.type](data);
      }

      for(var key in this.interests) {
        this.$bus.on(pack + ':' + key, handle, this);
      }
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