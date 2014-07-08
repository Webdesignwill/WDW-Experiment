
define([
  'Backbone'
],

function (Backbone) {

  "use strict";

  var RegisterModel = Backbone.Model.extend({

    url : '/auth/register',

    initialize : function () {}

  });

  return RegisterModel;

});
