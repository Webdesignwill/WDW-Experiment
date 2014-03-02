
define('ThisPage', [
  'Backbone',
  'handlebars',
  'text!pages/this/templates/this.tpl',
  "i18n!nls/this"
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var ThisPage = Backbone.Page.extend({

    id : 'this-page',
    className : 'width-auto this',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return ThisPage;

});
