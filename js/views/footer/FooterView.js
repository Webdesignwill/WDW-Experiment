
define('FooterView', [
  'Backbone',
  'handlebars',
  'FooterSocialView',
  'FooterNewsView',
  'FooterContactView',
  'text!views/footer/templates/footer.tpl',
  'i18n!nls/footer'
],

function (Backbone, handlebars, FooterSocialView, FooterNewsView, FooterContactView, template, content) {

  "use strict";

  var FooterView = Backbone.View.extend({

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      this.renderSubViews();

      return this;
    },

    renderSubViews : function () {
      // Todo pass in the view el
      var footerSocialView = new FooterSocialView();
      footerSocialView.render();

      var footerNewsView = new FooterNewsView();
      footerNewsView.render();

      var footerContactView = new FooterContactView();
      footerContactView.render();
    }

  });

  return FooterView;

});
