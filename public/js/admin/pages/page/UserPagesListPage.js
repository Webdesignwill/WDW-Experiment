
define('UserPagesListPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/admin/page/pages-list-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var UserPagesListPage = Backbone.Page.extend({

    tagName : 'form',
    id : 'pages-list-page',
    className : 'pages-list-page page',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      return this;
    }

  });

  return UserPagesListPage;

});
