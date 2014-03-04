
define('pagesCollection', [
    'Backbone',
    'PageModel',
    'text!site.json'
], function (Backbone, PageModel, siteConfig) {

  "use strict";

  var PagesCollection = Backbone.Collection.extend({

    url : '/js/site.json',
    model : PageModel,
    collection : [],

    parse : function (response) {
      this.parseModels(response.sitemap);
      this.reset(this.collection);
    },

    parseModels : function (pagesAry) {
      for(var i = 0; i < pagesAry.length; i++) {
        this.generateRoute(pagesAry[i], '', 0);
      }
    },

    generateRoute : function (page, route, level) {

      var pageModel = new PageModel(page);

      level += 1;
      if(pageModel.get('subpages') !== undefined) {
        route += pageModel.get('name') + '/';
        for(var i = 0; i < pageModel.get('subpages').length; i++) {
          this.generateRoute(pageModel.get('subpages')[i], route, level);
        }
      } else {
        route += pageModel.get('name') + '(/)'; // so the route /home/page/ will not return 404
      }

      pageModel.set({
        level : level,
        route : route
      });

      this.collection.push(pageModel);

    }

  });

  return new PagesCollection();

});
