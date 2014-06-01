
define('GithubPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/github/templates/github.tpl',
  "i18n!nls/github"
], function (Backbone, handlebars, webdesignwill, template, content) {

  "use strict";

  var GithubPage = Backbone.Page.extend({

    id : 'github-page',
    className : 'github-page page',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return GithubPage;

});
