
define('appModel', [
  'Backbone'
],

function (Backbone) {

  "use strict";

  var AppModel = Backbone.Model.extend({

    initialize : function () {
      this.setHelpers();
      this.setEvents();
    },

    setHelpers : function () {
      this.broker = _.clone(Backbone.Events);
      this.set('currentPage', {});
    },

    setEvents : function () {
      var self = this;
      this.on('change:currentPage', function (appModel) {
        // Not sure what to do here yet
      });
    }

  });

  return new AppModel();

});
