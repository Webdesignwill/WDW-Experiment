
define('pagesCollection', [
    'Backbone',
    'PageModel',
    'text!site.json'
], function (Backbone, PageModel, siteConfig) {

  "use strict";

  var PagesCollection = Backbone.Collection.extend({

    model : PageModel,

    defaultRoutes : [{
      "name" : "404",
      "page" : "PageNotFound"
    }],

    initialize : function () {
      this.set(JSON.parse(siteConfig)['site-map']);
      this.add(this.defaultRoutes);
    },

  });

  return new PagesCollection();

});
