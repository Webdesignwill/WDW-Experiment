
define([
  'handlebars',
  'userModel',
  'RepositoryItemView'
], function (handlebars, userModel, RepositoryItemView) {

  "use strict";

  var RepositoriesPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
    },

    setElements : function () {
      this.$repoList = this.$el.find('#github-repositories-list');
    },

    render : function () {
      var tpl = handlebars.compile(this.options.template);
      var compiled = tpl(userModel.attributes);

      this.$el.html(compiled);

      this.setElements();
      this.fetchRepositories();

      return this;
    },

    renderRepos : function () {
      var docFrag = document.createDocumentFragment(),
            repositoryItemView;

      userModel.repos.each(function (model, index, collection) {
        repositoryItemView = new RepositoryItemView({model : model});
        docFrag.appendChild(repositoryItemView.render().el);
      });

      this.$repoList.html(docFrag);
    },

    fetchRepositories : function () {
      userModel.repos.url = 'https://api.github.com/users/' + userModel.get('login') + '/repos'; // Add this to config
      userModel.repos.fetch({
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