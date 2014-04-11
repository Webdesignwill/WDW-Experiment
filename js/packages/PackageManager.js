
define('PackageManager', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.packages = {};
    this.$events = _.clone(Backbone.Events);

    webdesignwill.page.on('change', function (page) {
      var p = page.get('page'),
            pgs = p.model.get('packages');

      if(pgs) {
        this.loadPackages(pgs, p.$el);
      }
    }, this);

    this.interests = {
      loaded : function (data) {
        this.packages[data.pack].init();
      },
      initialised : function (data) {
        this.packages[data.pack].start();
      },
      started : function (data) {
        // No calllback for started yet
      },
      stopped : function (data) {
        this.packages[data.pack].stop();
      }
    };

    this.loadPackages = function (packages, $el) {
      this.$el = $el;
      for(var i = 0;i<packages.length;i++) {
        this.load(packages[i]);
      }
    };

    this.load = function (pack) {
      var pge = this.packages[pack];

      if(!pge) {
        this.setPackageListeners(pack);
        require([pack]);
      } else if (this.isPackageLoaded(pack)) {
        console.log('%c ' + pack + ' already ' + this.packages[pack].get('status') + ' ', 'background: #FF9900; color: #FFFFFF');
      }
    };

    this.setPackageListeners = function (pack) {

      var self = this;

      function handle (data) {
        self.setPackageProps(data.pack, data.type);
        self.interests[data.type].call(self, data);
      }

      for(var key in this.interests) {
        this.$events.on(pack + ':' + key, handle, this);
      }
    };

    this.setPackageProps = function (pack, status) {
      this.packages[pack].set({
        name : pack,
        status : status,
        $el : this.$el
      });
    };

    this.isPackageLoaded = function (pack) {
      var pge = this.packages[pack];
      return pge.get('status') === 'loaded' || 'started' ? true : false;
    };

    return this;

  };

  webdesignwill.packageManager = new PackageManager();

});