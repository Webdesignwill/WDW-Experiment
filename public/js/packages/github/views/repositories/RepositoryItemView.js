
define([
  'Backbone',
  'handlebars',
  'text!views/repositories/templates/repository.tpl'
], function (Backbone, handlebars, template) {

  "use strict";

  var RepositoryItemView = Backbone.Page.extend({

    tagName : 'li',

    initialize : function () {},

    setElements : function () {
      this.$stargazerIcon = this.$el.find('.stargazer-icon');
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