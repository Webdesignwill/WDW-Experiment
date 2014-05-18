
define('ManagePage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/admin/page/manage-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var ManagePage = Backbone.Page.extend({

    tagName : 'form',
    id : 'manage-page',
    className : 'manage-page page',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      return this;
    }

  });

  return ManagePage;

});
