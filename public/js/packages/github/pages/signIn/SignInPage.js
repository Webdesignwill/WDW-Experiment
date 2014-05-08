
define('github-SigninPage', [
  'Backbone',
  'git',
  'handlebars',
  'github-SelectUserFormView',
  'text!github-path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, git, handlebars, SelectUserFormView, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'github-signin-page',
    className : 'github-signin-page page',

    initialize : function () {},

    setElements : function () {
      this.$selectUser = this.$el.find('#github-select-user');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();
      new SelectUserFormView({el : this.$selectUser});
      return this;
    }

  });

  return SigninPage;

});