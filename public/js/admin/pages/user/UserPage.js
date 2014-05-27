
define('UserPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/user/templates/user-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var UserPage = Backbone.Page.extend({

    tagName : 'form',
    id : 'user-page',
    className : 'user-page page',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      return this;
    }

  });

  return UserPage;

});
