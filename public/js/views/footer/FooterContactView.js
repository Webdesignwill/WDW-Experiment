
define([
  'Backbone',
  'handlebars',
  'text!views/footer/templates/footerContact.tpl',
  'i18n!nls/footer',
  'i18n!nls/credentials'
],

function (Backbone, handlebars, template, content, credentials) {

  "use strict";

  var FooterContactView = Backbone.View.extend({

    initialize : function () {
      content.credentials = credentials;
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return FooterContactView;

});
