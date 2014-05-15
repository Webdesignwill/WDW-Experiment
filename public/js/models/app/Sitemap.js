
define('Sitemap', [
  'Backbone',
  'webdesignwill',
  'PageModel'
],

function (Backbone, webdesignwill, PageModel) {

  "use strict";

  var Sitemap = Backbone.Model.extend({

    url : '/sitemap',
    affix : '-page',
    sitemap : {},

    initialize : function () {},

    parse : function (response, options) {
       for(var i = 0; i < response.length; i++) {
        var nextPage = response[i+1], prevPage = response[i-1];
        this.sitemap[response[i].name + '-page'] = new PageModel(this.createModel(response[i], 0, '', '', nextPage, prevPage));
      }

      return this.sitemap;
    },

    createModel : function (sitemap, level, route, path, np, pp) {

      function pageRelation (pr) {
        return pr && !pr.admin ? pr.name : null;
      }

      var i, model = {
        level : level + 1,
        name : sitemap.name,
        map : sitemap.name + this.affix,
        page : sitemap.page,
        route : route,
        path : path,
        nextPage : pageRelation(np),
        prevPage : pageRelation(pp),
        admin : sitemap.admin || false,
        nav : sitemap.nav || null,
        packages : sitemap.packages || null
      };

      model.path += sitemap.name + '/';
      model.route += sitemap.name;

      if(sitemap.subpages) {
        model.route += '/';
        for(i = 0; i < sitemap.subpages.length; i++) {
          var nextPage = sitemap.subpages[i+1], prevPage = sitemap.subpages[i-1];
          this.sitemap[sitemap.subpages[i].name + '-page'] = new PageModel(this.createModel(sitemap.subpages[i], model.level, model.route, model.path, nextPage, prevPage));
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
console.log(model);
      return model;

    }

  });

  webdesignwill.sitemap = new Sitemap();

});
