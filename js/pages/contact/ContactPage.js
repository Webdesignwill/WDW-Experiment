
define('ContactPage', [
  'Backbone',
  'handlebars',
  'text!pages/contact/templates/contact.tpl',
  'i18n!nls/contact'
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var ContactPage = Backbone.Page.extend({

    id : 'contact-page',
    className : 'width-auto contact',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return ContactPage;

});
