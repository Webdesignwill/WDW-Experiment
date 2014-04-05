
define('SigninPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!githubPath/pages/signIn/templates/sign-in.tpl'
], function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'signin-page',
    className : 'signin-page page',

    initialize : function () {

    },

    render : function () {
      return this;
    }

  });

  return SigninPage;

});