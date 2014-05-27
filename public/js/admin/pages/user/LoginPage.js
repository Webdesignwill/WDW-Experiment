
define('LoginPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/user/templates/login-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var LoginPage = Backbone.Page.extend({

    tagName : 'form',
    id : 'login-page',
    className : 'login-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return LoginPage;

});
