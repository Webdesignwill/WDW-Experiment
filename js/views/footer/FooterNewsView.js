
define('FooterNewsView', [
  'Backbone',
  'handlebars',
  'NewsCollection',
  'FooterNewsItemView',
  'text!views/footer/templates/footerNews.tpl',
  'i18n!nls/footer'
],

function (Backbone, handlebars, newsCollection, FooterNewsItemView, template, content) {

  "use strict";

  var FooterNewsView = Backbone.View.extend({

    el : '.footer-news',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);
      this.renderNewsItems();

      return this;
    },

    renderNewsItems : function () {
      var fragment = document.createDocumentFragment();

      newsCollection.each(function (model) {
        var footerNewsItemView = new FooterNewsItemView({model : model});
        fragment.appendChild(footerNewsItemView.render().el);
      });

      this.$el.find('.footer-news-items').html(fragment);
    }

  });

  return FooterNewsView;

});
