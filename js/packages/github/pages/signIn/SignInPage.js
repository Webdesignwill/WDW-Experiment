
define('github-SigninPage', [
  'Backbone',
  'git',
  'handlebars',
  'text!github-path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, git, handlebars, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'github-signin-page',
    className : 'github-signin-page page',
    events : {
      'submit .input-button-combo' : 'formHandler'
    },

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    },

    formHandler : function (e) {
      e.preventDefault();
      var self = this;
      git.user = new Backbone.Model();
      git.user.url = 'https://api.github.com/users/' + e.target[0].value;
      git.user.fetch({success : self.success, error : self.error});
    },

    success : function (response) {
      git.navigate('repositories-page');
    },

    error : function () {
      alert('Are you sure that user exists?');
    }

  });

  return SigninPage;

});