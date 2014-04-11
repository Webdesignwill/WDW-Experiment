
define('SiteContentHeaderView', [
  'Backbone',
  'webdesignwill',
  'handlebars',
  'text!views/siteContentHeader/templates/site-content-header.tpl',
  'i18n!nls/home'
],

function (Backbone, webdesignwill, handlebars, template, content) {

  "use strict";

  var SiteContentHeaderView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setEvents();
    },

    setEvents : function () {
      webdesignwill.page.on('change', function (page) {
        // change header things?!
      });
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return SiteContentHeaderView;

});
