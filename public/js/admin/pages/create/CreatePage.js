
define('CreatePage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/create/create-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var CreatePage = Backbone.Page.extend({

    tagName : 'form',
    id : 'create-page',
    className : 'manage-page page',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      return this;
    }

  });

  return CreatePage;

});
