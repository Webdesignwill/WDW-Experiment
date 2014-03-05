
define('ThisPage', [
  'Backbone',
  'handlebars',
  'text!pages/this/templates/this.tpl',
  'i18n!nls/this',
  'pagesCollection'
],

function (Backbone, handlebars, template, content, pagesCollection) {

  "use strict";

  var ThisPage = Backbone.Page.extend({

    id : 'this-page',
    className : 'width-auto this-page',

    initialize : function () {
      console.log('My next page : ', this.model.getNextPage(pagesCollection));
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return ThisPage;

});
