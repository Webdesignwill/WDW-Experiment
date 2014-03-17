
define('SiteLoaderView', [
  'Backbone',
  'appModel',
  'text!views/siteLoader/templates/site-loader.tpl'
],

function (Backbone, appModel, template) {

  "use strict";

  var SiteLoaderView = Backbone.View.extend({

    events : {
      'click .wdw-vertical-blue' : 'enter'
    },

    initialize : function () {
      this.render();
      this.setElements();
    },

    enter : function () {
      this.$body.removeClass('active-loader');
    },

    setElements : function () {
      this.$body = $('body');
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return SiteLoaderView;

});