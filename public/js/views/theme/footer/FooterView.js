
define('FooterView', [
  'Backbone',
  'handlebars',
  'FooterSocialView',
  'FooterContactView',
  'text!views/theme/footer/templates/footer.tpl',
  'i18n!nls/footer'
],

function (Backbone, handlebars, FooterSocialView, FooterContactView, template, content) {

  "use strict";

  var FooterView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setElements();
      this.instantiateViews();
    },

    setElements : function () {
      this.$social = this.$el.find('.footer-social');
      this.$news = this.$el.find('.footer-news');
      this.$contact = this.$el.find('.footer-contact');
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    },

    instantiateViews : function () {

      new FooterSocialView({
        el : this.$social
      });

      new FooterContactView({
        el : this.$contact
      });

    }

  });

  return FooterView;

});
