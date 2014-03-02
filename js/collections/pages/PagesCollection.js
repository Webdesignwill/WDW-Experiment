
define('pagesCollection', [
    'Backbone',
    'PageModel',
    'text!site-config.json'
], function (Backbone, PageModel, siteConfig) {

  "use strict";

  var PagesCollection = Backbone.Collection.extend({

    model : PageModel,

    initialize : function () {
      this.set(JSON.parse(siteConfig)['site-map']);
    }

  });

  return new PagesCollection();

});
