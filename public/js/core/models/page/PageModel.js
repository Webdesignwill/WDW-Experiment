
define('PageModel', [
  'Backbone',
  'webdesignwill',
  'i18n!nls/nav'
],

function (Backbone, webdesignwill, content) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    url : '/api/page/put/',

    initialize : function () {
      this.setNavSubText();
      this.url += this.get('id');
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

    getNextPage : function (prop) {
      return prop ? webdesignwill.sitemap.get(this.get('nextPage') + '-page').get(prop) : webdesignwill.sitemap.get(this.get('nextPage') + '-page');
    },

    getPrevPage : function (prop) {
      return prop ? webdesignwill.sitemap.get(this.get('prevPage') + '-page').get(prop) : webdesignwill.sitemap.get(this.get('prevPage') + '-page');
    }

  });

  return PageModel;

});
