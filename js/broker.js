
define('broker', [
  'Backbone',
  'appModel'
],

function (Backbone, appModel) {

  "use strict";

  appModel.broker = _.clone(Backbone.Events);

});