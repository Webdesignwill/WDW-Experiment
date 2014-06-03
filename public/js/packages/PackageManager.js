
define([
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.packages = {};
    this.$events = _.clone(Backbone.Events);
    this.interests = {
      loaded : function (data) {
        this.packages[data.pack].init();
      },
      initialised : function (data) {
        this.packages[data.pack].start();
      },
      started : function (data) {
        this.packages[data.pack].ready();
      },
      stopped : function (data) {}
    };

    webdesignwill.page.on('change:page', function (model) {
      var pageModel = model.get('page').model,
            pgs = pageModel.get('packages');

      if(pgs) {
        this.loadPackages(pgs);
      }

    }, this);

    this.loadPackages = function (packages) {
      for(var i = 0;i<packages.length;i++) {
        this.load(packages[i]);
      }
    };

    this.load = function (pack) {
      var pge = this.packages[pack],
            self = this;

      if(!pge) {
        require([pack], function () {
          self.setPackageListeners(pack);
        });
      } else if (pge.get('status') === 'stopped') {
        this.packages[pack].start();
      }
    };

    this.setPackageListeners = function (pack) {

      var self = this;

      function handle (data) {
        self.setPackageProps(data.pack, data.type);
        self.interests[data.type].apply(self, [data]);
      }

      for(var key in this.interests) {
        this.$events.on(pack + ':' + key, handle, this);
      }
    };

    this.setPackageProps = function (pack, status) {
      switch (status) {
        case 'loaded' :
          this.packages[pack].set({
            name : pack,
            prefix : pack + '-',
          });
          break;
        case 'started' :
          this.packages[pack].$el = webdesignwill.page.get('page').$el.find("[data-package='" + pack + "']");
        break;
      }
      this.packages[pack].set({
        status : status
      });
    };

    return this;

  };

  webdesignwill.packageManager = new PackageManager();

});