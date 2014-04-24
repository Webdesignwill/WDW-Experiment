
define('git', [
  'Backbone',
  'webdesignwill',
  'github-Sitemap'
], function (Backbone, webdesignwill, Sitemap) {

  "use strict";

  var Github = Backbone.Package.extend({

    sitemap : new Sitemap(),

    loaded : function () {},
    initialised : function () {},
    started : function () {},
    stopped : function () {},

    ready : function () {
      // Do all rendering related stuff
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});