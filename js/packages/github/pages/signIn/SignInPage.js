
define('github-SigninPage', [
  'Backbone',
  'handlebars',
  'text!github-path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, handlebars, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'github-signin-page',
    className : 'github-signin-page page',

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return SigninPage;

});