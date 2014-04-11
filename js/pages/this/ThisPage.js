
define('ThisPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/this/templates/this.tpl',
  "i18n!nls/this"
], function (Backbone, handlebars, webdesignwill, template, content) {

  "use strict";

  var ThisPage = Backbone.Page.extend({

    id : 'this-page',
    className : 'this-page page',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return ThisPage;

});
