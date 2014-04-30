
define('github-SigninPage', [
  'Backbone',
  'handlebars',
  'github-Repositories',
  'text!github-path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, handlebars, Repositories, template) {

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
      var repos = new Repositories();
      repos.url = 'https://api.github.com/users/' + e.target[0].value + '/repos';
      repos.fetch({
        success : function (response) {
          console.log('Success : ', response);
        },
        error : function (response) {
          console.log('Error : ', response);
        }
      });
    }

  });

  return SigninPage;

});