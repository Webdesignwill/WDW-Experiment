
define('SiteContentHeaderView', [
  'Backbone',
  'appModel',
  'handlebars',
  'text!views/siteContentHeader/templates/site-content-header.tpl',
  'i18n!nls/home'
],

function (Backbone, appModel, handlebars, template, content) {

  "use strict";

  var SiteContentHeaderView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setEvents();
    },

    setEvents : function () {
      appModel.on('change:currentPage', function (appModel) {
        console.log('Remember the site content header');
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
