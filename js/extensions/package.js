
define('package', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  Backbone.Package = Backbone.Model.extend({

    $broker : _.clone(Backbone.Events),

    initialize : function () {
      this.setPackageListeners();
    },

    init : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          webdesignwill.packageManager.$events.trigger(self.get('name') + ':initialised', {
            type : 'initialised',
            pack : self.get('name')
          });
        }, reset : true
      });
    },

    start : function () {
      webdesignwill.packageManager.$events.trigger(this.get('name') + ':started', {
        type : 'started',
        pack : this.get('name')
      });
    },

    stop : function () {
      webdesignwill.packageManager.$events.trigger(this.get('name') + ':stopped', {
        type : 'stopped',
        pack : this.get('name')
      });
    },

    setPackageListeners : function () {
      this.on('change:status', function (model) {
        if(typeof this[model.get('status')] !== "undefined") {
          this[model.get('status')]();
        }
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    }

  });

});