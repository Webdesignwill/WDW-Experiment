
define([
  'Backbone',
  'PageModel'
],

function (Backbone, PageModel) {

  "use strict";

  var Sitemap = Backbone.Model.extend({

    url : '/js/packages/talk/config.json', // TODO set path root
    affix : '-page',
    sitemap : {},

    initialize : function () {},

    parse : function (response, options) {
       for(var i = 0; i < response.sitemap.length; i++) {
        this.sitemap[response.sitemap[i].name + '-page'] = new PageModel(this.createModel(response.sitemap[i]));
      }

      return this.sitemap;
    },

    createModel : function (sitemap) {

      var i, model = {
        name : sitemap.name,
        map : sitemap.name + this.affix,
        page : sitemap.page
      };

      return model;

    }

  });

  return Sitemap;

});
