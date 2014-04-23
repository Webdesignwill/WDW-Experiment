
define('git', [
  'Backbone',
  'webdesignwill',
  'github-Sitemap'
], function (Backbone, webdesignwill, Sitemap) {

  "use strict";

  var Github = Backbone.Model.extend({

    sitemap : new Sitemap(),
    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),

    initialize : function () {
      this.setPackageListeners();
      this.$events = webdesignwill.packageManager.$events;
    },

    init : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.$events.trigger(self.get('name') + ':initialised', {
            type : 'initialised',
            pack : self.get('name')
          });
        }, reset : true
      });
    },

    start : function () {
      this.$events.trigger(this.get('name') + ':started', {
        type : 'started',
        pack : this.get('name')
      });
    },

    stop : function () {
      this.$events.trigger(this.get('name') + ':stopped', {
        type : 'stopped',
        pack : this.get('name')
      });
    },

    setPackageListeners : function () {
      this.on('change:status', function () {
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});