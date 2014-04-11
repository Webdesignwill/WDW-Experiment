
define('Github', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  var Github = Backbone.Model.extend({

    initialize : function () {
      this.setPackageListeners();
      this.$events = webdesignwill.packageManager.$events;
    },

    init : function () {
      this.$events.trigger(this.get('name') + ':initialised', {
        type : 'initialised',
        pack : this.get('name')
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