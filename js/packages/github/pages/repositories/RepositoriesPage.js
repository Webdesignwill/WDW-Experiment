
define('github-RepositoriesPage', [
  'Backbone',
  'git',
  'handlebars',
  'text!github-path/pages/repositories/templates/repositories.tpl'
], function (Backbone, git, handlebars, template) {

  "use strict";

  var RepositoriesPage = Backbone.Page.extend({

    id : 'github-repositories-page',
    className : 'github-repositories-page page',

    initialize : function () {
      git.user.repos = new Backbone.Collection();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(git.user.attributes);

      this.$el.html(compiled);
      this.fetchRepositories();

      return this;
    },

    fetchRepositories : function () {
      var self = this;
      git.user.repos.url = 'https://api.github.com/users/' + git.user.get('login') + '/repos';
      git.user.repos.fetch({success : self.success, error : self.error}, {reset:true});
    },

    success : function () {
      debugger;
    },

    error : function () {
      alert('There was a problem getting the repositories');
    }

  });

  return RepositoriesPage;

});