
define('FooterSocialView', [
  'Backbone',
  'handlebars',
  'text!views/footer/templates/footerSocial.tpl',
  'i18n!nls/footer'
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var FooterSocialView = Backbone.View.extend({

    el : '.footer-social',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return FooterSocialView;

});
