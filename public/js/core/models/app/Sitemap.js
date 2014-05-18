
define('Sitemap', [
  'Backbone',
  'webdesignwill',
  'PageModel'
],

function (Backbone, webdesignwill, PageModel) {

  "use strict";

  var Sitemap = Backbone.Model.extend({

    url : '/api/page/list',
    affix : '-page',
    sitemap : {},

    admin : {
      name : 'admin',
      admin : true,
      page : 'AdminHome',
      subpages : [{
        name : 'create',
        admin : true,
        page : 'CreatePage'
      },{
        name : 'edit',
        option : true,
        admin : true,
        page : 'EditPage'
      }]
    },

    initialize : function () {},

    parse : function (response, options) {

      response.push(this.admin); // Add admin pages

       for(var i = 0; i < response.length; i++) {
        var nextPage = response[i+1], prevPage = response[i-1];
        this.sitemap[this.setPropertyName(response[i])] = new PageModel(this.createModel(response[i], 0, '', '', nextPage, prevPage));
      }

      return this.sitemap;
    },

    setPropertyName : function (pageObject) {
      return pageObject.admin === true ? pageObject.name + '-page' : pageObject._id;
    },

    createModel : function (sitemap, level, route, path, np, pp) {

      function pageRelation (pr) {
        return pr && !pr.admin ? pr.name : null;
      }

      var i, model = {
        id : sitemap._id,
        pageid : sitemap._id,
        level : level + 1,
        order : sitemap.order,
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

      if(sitemap.order === 0) { // Is most likely homepage
        model.root = true;
      }

      if(sitemap.subpages) {
        model.route += '/';
        for(i = 0; i < sitemap.subpages.length; i++) {
          var nextPage = sitemap.subpages[i+1], prevPage = sitemap.subpages[i-1];
          this.sitemap[this.setPropertyName(sitemap.subpages[i])] = new PageModel(this.createModel(sitemap.subpages[i], model.level, model.route, model.path, nextPage, prevPage));
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
