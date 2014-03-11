
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
      var models = [];
      for(var i = 0; i < response.sitemap.length; i++) {
        models.push(this.createModel(response.sitemap[i], 0));
      }
      return this.pageModels;
    },

    createModel : function (sitemap, level, route) {

      var model;

      model = {
        level : level += 1,
        name : sitemap.name,
        subpages : [],
        route : route ? route : ''
      };

      model.route += sitemap.name;
      model.route += sitemap.subpages ? '/' : '(/)';

      if(sitemap.subpages) {
        for(var i = 0; i < sitemap.subpages.length; i++) {
          model.subpages.push(this.createModel(sitemap.subpages[i], model.level, model.route));
        }
      }

      return model;

    }

  });

  return new PagesCollection();

});
