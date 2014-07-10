
define([
  'Backbone',
  'handlebars',
  'text!views/siteContentHeader/templates/site-content-header.tpl',
  'i18n!nls/home'
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var SiteContentHeaderView = Backbone.View.extend({

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

  return SiteContentHeaderView;

});
