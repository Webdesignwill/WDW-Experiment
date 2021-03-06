
define([
  'handlebars',
  'userModel'
], function (handlebars, userModel) {

  "use strict";

  var RepositoryPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
    },

    render : function () {
      var tpl = handlebars.compile(this.options.template);
      var compiled = tpl(userModel.attributes);
      this.$el.html(compiled);
      return this;
    }

  });

  return RepositoryPage;

});