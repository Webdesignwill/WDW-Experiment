
define('EditPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/edit/templates/edit-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var EditPage = Backbone.Page.extend({

    tagName : 'form',
    id : 'edit-page',
    className : 'edit-page page',
    events : {
      'submit' : 'handler'
    },

    initialize : function () {
      this.pageToEdit = webdesignwill.sitemap.get(this.options.identifier);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.pageToEdit.attributes);

      this.$el.html(compiled);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.pageToEdit.save();
    }

  });

  return EditPage;

});
