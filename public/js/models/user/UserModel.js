
define([
  'webdesignwill'
],

function (webdesignwill) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    urls : {
      register : '/auth/register',
      login : '/auth/login'
    }

  });

  return UserModel;

});
