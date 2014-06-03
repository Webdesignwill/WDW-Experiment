
define([
  'Backbone',
  'git',
  'handlebars',
  'github-RepositoryItemView',
  'text!github-path/pages/repositories/templates/repositories.tpl'
], function (Backbone, git, handlebars, RepositoryItemView, template) {

  "use strict";

  var RepositoriesPage = Backbone.Page.extend({

    id : 'github-repositories-page',
    className : 'github-repositories-page page',

    initialize : function () {},

    setElements : function () {
      this.$repoList = this.$el.find('#github-repositories-list');
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(git.user.attributes);

      this.$el.html(compiled);

      this.setElements();
      this.fetchRepositories();

      return this;
    },

    renderRepos : function () {
      var docFrag = document.createDocumentFragment(),
            repositoryItemView;

      git.user.repos.each(function (model, index, collection) {
        repositoryItemView = new RepositoryItemView({model : model});
        docFrag.appendChild(repositoryItemView.render().el);
      });

      this.$repoList.html(docFrag);
    },

    fetchRepositories : function () {
      git.user.repos.url = 'https://api.github.com/users/' + git.user.get('login') + '/repos';
      git.user.repos.fetch({
        context : this,
        success : this.success,
        reset : true
      });
    },

    success : function (collection, response, options) {
      options.context.renderRepos();
    }

  });

  return RepositoriesPage;

});