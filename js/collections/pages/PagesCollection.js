
define('pagesCollection', [
    'Backbone',
    'PageModel'
], function (Backbone, PageModel) {

  "use strict";

  var PagesCollection = Backbone.Collection.extend({

    url : '/js/site.json',
    model : PageModel,
    pageModels : [],

    parse : function (response, options) {
      for(var i = 0; i < response.sitemap.length; i++) {
        var nextPage = response.sitemap[i+1], prevPage = response.sitemap[i-1];
        this.pageModels.push(this.createModel(response.sitemap[i], 0, '', '', nextPage, prevPage));
      }
      return this.pageModels;
    },

    createModel : function (sitemap, level, route, path, np, pp) {

      var model = {
        level : level + 1,
        name : sitemap.name,
        page : sitemap.page,
        route : route,
        path : path,
        nextPage : np ? np.name : null,
        prevPage : pp ? pp.name : null,
        nav : sitemap.nav
      };

      model.path += sitemap.name + '/';
      model.route += sitemap.name;
      model.route += sitemap.subpages ? '/' : '(/)';

      if(sitemap.subpages) {
        for(var i = 0; i < sitemap.subpages.length; i++) {
          var nextPage = sitemap.subpages[i+1], prevPage = sitemap.subpages[i-1];
          this.pageModels.push(this.createModel(sitemap.subpages[i], model.level, model.route, model.path, nextPage, prevPage));
        }
      }

      return model;

    }

  });

  return new PagesCollection();

});
