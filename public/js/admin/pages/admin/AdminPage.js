
define('AdminPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/admin/templates/admin.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var AdminPage = Backbone.Page.extend({

    id : 'admin-page',
    className : 'admin-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return AdminPage;

});
