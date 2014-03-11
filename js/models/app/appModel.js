
define('appModel', [
  'Backbone'
],

function (Backbone) {

  "use strict";

  var AppModel = Backbone.Model.extend({

    initialize : function () {
      this.setBroker();
      this.setEvents();
    },

    setBroker : function () {
      this.broker = _.clone(Backbone.Events);
    },

    setEvents : function () {
      var self = this;
      this.broker.on('page:change', function (object) {
        self.set({
          currentPageView : object.newPageView,
          currentPageModel : object.newPageModel
        });
      });
    }

  });

  return new AppModel();

});
