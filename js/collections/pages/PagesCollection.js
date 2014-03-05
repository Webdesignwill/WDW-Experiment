
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
      this.parseModels(response.sitemap);
      return this.pageModels;
    },

    parseModels : function (pagesAry) {
      for(var i = 0; i < pagesAry.length; i++) {
        this.augmentModel(
          pagesAry[i-1] || null,
          pagesAry[i],
          pagesAry[i+1] || null,
          '',
          0
        );
      }
    },

    augmentModel : function (previousPage, page, nextPage, route, level, parent) {
      level += 1;
      if(page.subpages) {
        route += page.name + '/';
        for(var i = 0; i < page.subpages.length; i++) {
          this.augmentModel(
            page.subpages[i-1] || null,
            page.subpages[i],
            page.subpages[i+1] || null,
            route,
            level,
            page
          );
        }
      } else {
        route += page.name + '(/)';
      }

      page.level = level;
      page.route = route;
      page.parent = parent || null;
      page.previousPage = previousPage;
      page.nextPage = nextPage;

      this.pageModels.push(page);

    }

  });

  return new PagesCollection();

});
