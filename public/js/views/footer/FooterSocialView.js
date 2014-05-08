
define('FooterSocialView', [
  'Backbone',
  'handlebars',
  'text!views/footer/templates/footerSocial.tpl',
  'i18n!nls/footer'
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var FooterSocialView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return FooterSocialView;

});
