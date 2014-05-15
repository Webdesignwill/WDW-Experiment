
define('CreatePage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/admin/page/templates/create.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var CreatePage = Backbone.Page.extend({

    tagName : 'form',
    id : 'create-page',
    className : 'create-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return CreatePage;

});
