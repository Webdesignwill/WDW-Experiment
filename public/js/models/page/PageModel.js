
define([
  'Backbone',
  'webdesignwill',
  'i18n!nls/nav'
],

function (Backbone, webdesignwill, content) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    initialize : function () {
      this.setNavSubText();
    },

    parse : function (model, options) {
      return model;
    },

    setNavSubText : function () {
      var navSubText = content[this.get('name')] && content[this.get('name')].subText;
      if(navSubText) {
        this.set('navSubText', navSubText);
      }
    },

    getPage : function (prop, direction) {
      return prop ? webdesignwill.sitemap.get(this.get(direction + 'Page') + '-page').get(prop) : webdesignwill.sitemap.get(this.get(direction + 'Page') + '-page');
    }

  });

  return PageModel;

});
