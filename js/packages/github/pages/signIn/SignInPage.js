
define('GH_SigninPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!GH_path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'signin-page',
    className : 'signin-page page',

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return SigninPage;

});