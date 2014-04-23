
define('Sitemap', [
  'Backbone',
  'webdesignwill',
  'PageModel'
],

function (Backbone, webdesignwill, PageModel) {

  "use strict";

  var Sitemap = Backbone.Model.extend({

    url : '/js/sitemap.json',
    affix : '-page',
    sitemap : {},

    initialize : function () {},

    parse : function (response, options) {
       for(var i = 0; i < response.sitemap.length; i++) {
        var nextPage = response.sitemap[i+1], prevPage = response.sitemap[i-1];
        this.sitemap[response.sitemap[i].name + '-page'] = new PageModel(this.createModel(response.sitemap[i], 0, '', '', nextPage, prevPage));
      }

      return this.sitemap;
    },

    createModel : function (sitemap, level, route, path, np, pp) {

      var i, model = {
        level : level + 1,
        name : sitemap.name,
        map : sitemap.name + this.affix,
        page : sitemap.page,
        route : route,
        path : path,
        nextPage : np ? np.name : null,
        prevPage : pp ? pp.name : null,
        nav : sitemap.nav || null,
        packages : sitemap.packages || null
      };

      model.path += sitemap.name + '/';
      model.route += sitemap.name;

      if(sitemap.subpages) {
        model.route += '/';
        for(i = 0; i < sitemap.subpages.length; i++) {
          var nextPage = sitemap.subpages[i+1], prevPage = sitemap.subpages[i-1];
          this.sitemap[response.sitemap[i].name + '-page'] = new PageModel(this.createModel(response.sitemap[i], 0, '', '', nextPage, prevPage));
        }
        if(sitemap.subpages.length === i) {
          model.route = model.route.slice(0,-1);
          model.route += '(/)';
        }
      } else {
        model.route += '(/)';
      }

      if(sitemap.option) {
        if(sitemap.subpages && sitemap.subpages.length === i || !sitemap.subpages) {
          model.route += '(:option)';
        }
      }

      if(sitemap.override) {
        model.route = sitemap.override.route;
        model.path = sitemap.override.path;
      }

      return model;

    }

  });

  webdesignwill.sitemap = new Sitemap();

});
