
define('git', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var Github = Backbone.Model.extend({

    initialize : function () {
      this.setPackageListeners();
      this.$events = webdesignwill.packageManager.$events;
      this.$events.on(this.get('name') + ':goto', this.goto);
    },

    init : function ($el) {
      this.setElement($el);
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

    goto : function (data) {
      // how will each package trigger a goto between itself?
    },

    setPackageListeners : function () {
      this.on('change:status', function () {
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    },

    setElement : function ($el) {
      var $element = $el.find(this.get('name'));
      if($element.length < 1) {
        this.$el = $el;
        return;
      }
      this.$el = $element;
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});