
define('RegisterPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/pages/user/templates/register-page.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var RegisterPage = Backbone.Page.extend({

    tagName : 'form',
    id : 'register-page',
    className : 'register-page page',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      return this;
    }

  });

  return RegisterPage;

});
