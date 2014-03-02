
define('FooterNewsItemView', [
  'Backbone',
  'handlebars',
  'text!views/footer/templates/footerNewsItem.tpl'
],

function (Backbone, handlebars, template, content, credentials) {

  "use strict";

  var FooterNewsItemView = Backbone.View.extend({

    className : 'footer-news-item',

    initialize : function (options) {
      this.model = options.model;
    },

    render : function () {
      console.log(this.model);
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);

      return this;
    }

  });

  return FooterNewsItemView;

});
