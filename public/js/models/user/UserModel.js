
define([
  'webdesignwill'
],

function (webdesignwill) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    defaults : {
      loggedin : false,
      name : 'William'
    }

  });

  return UserModel;

});
