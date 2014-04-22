
define('PackageManager', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.packages = {};
    this.$events = _.clone(Backbone.Events);

    this.interests = {
      loaded : function (data, $el) {
        this.packages[data.pack].init($el);
      },
      initialised : function (data) {
        this.packages[data.pack].start();
      },
      started : function (data) {
        // Started, nothing to do here yet
      },
      stopped : function (data) {
        this.packages[data.pack].stop();
      }
    };

    webdesignwill.page.on('change', function (page) {
      var p = page.get('page'),
            pgs = p.model.get('packages');

      if(pgs) {
        this.loadPackages(pgs, p.$el);
      }
    }, this);

    this.loadPackages = function (packages, $el) {
      for(var i = 0;i<packages.length;i++) {
        this.load(packages[i], $el);
      }
    };

    this.load = function (pack, $el) {
      var pge = this.packages[pack],
            self = this;

      if(!pge) {
        require([pack], function () {
          self.setPackageListeners(pack, $el);
        });
      } else if (pge.get('status') === 'started') {
        console.log('%c ' + pack + ' already ' + pge.get('status') + ' ', 'background: #FF9900; color: #FFFFFF');
        pge.continue($el);
      }
    };

    this.setPackageListeners = function (pack, $el) {

      var self = this;

      function handle (data) {
        self.setPackageProps(data.pack, data.type);
        self.interests[data.type].apply(self, [data, $el]);
      }

      for(var key in this.interests) {
        this.$events.on(pack + ':' + key, handle, this);
      }
    };

    this.setPackageProps = function (pack, status) {
      this.packages[pack].set({
        name : pack,
        status : status
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