
define('Github', [
  'Backbone',
  'webdesignwill',
  'gh_SigninPage'
], function (Backbone, webdesignwill, SigninPage) {

  var Github = Backbone.Model.extend({

    defaults : {
      name : 'github'
    },

    initialize : function () {
      this.setPackageListeners();
      this.$bus = webdesignwill.packageManager.$bus;
    },

    init : function () {
      this.$bus.trigger(this.get('name') + ':initialised');
    },

    start : function () {
      this.$bus.trigger(this.get('name') + ':started');
    },

    stop : function () {
      this.$bus.trigger(this.get('name') + ':stopped');
    },

    setPackageListeners : function () {
      this.on('change:status', function () {
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    }

  });

  webdesignwill.packages.github = new Github();

});