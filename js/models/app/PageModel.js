
define('PageModel', [
  'Backbone',
  'appModel',
  'i18n!nls/nav'
],

function (Backbone, appModel, content) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    initialize : function () {
      this.setNavSubText();
    },

    parse : function (model, options) {
      return model;
    },

    setNavSubText : function () {
      var navSubText = content[this.get('name')] && content[this.get('name')].subText || '';
      this.set('navSubText', navSubText);
    },

    getNextPage : function (prop) {
      if(prop) {
        return appModel.sitemap.get(this.get('nextPage') + '-page').get(prop);
      }
      return appModel.sitemap.get(this.get('nextPage') + '-page');
    },

    getPrevPage : function (prop) {
      if(prop) {
        return appModel.sitemap.get(this.get('prevPage') + '-page').get(prop);
      }
      return appModel.sitemap.get(this.get('prevPage') + '-page');
    }

  });

  return PageModel;

});
