
define([
  'app',
  'handlebars',
  'userModel',
  'text!views/repositories/templates/repository.tpl'
], function (app, handlebars, userModel, template) {

  "use strict";

  var RepositoryItemView = Backbone.Page.extend({

    tagName : 'li',
    events : {
      'click' : 'handler'
    },

    initialize : function () {},

    setElements : function () {
      this.$stargazerIcon = this.$el.find('.stargazer-icon');
    },

    handler : function () {
      userModel.url = this.model.get('url');
      userModel.fetch({
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      app.router.navigate('repository-page');
    },

    error : function () {
      alert('Somethings gone wrong with that repo');
    },

    openRepo : function (ev) {

      console.log(this.model);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);

      this.setElements();

      if(this.model.get('stargazers_count') > 0) {
        this.$stargazerIcon.addClass('starred');
      }

      return this;
    }

  });

  return RepositoryItemView;

});