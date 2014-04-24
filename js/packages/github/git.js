
define('git', [
  'Backbone',
  'webdesignwill',
  'github-Sitemap'
], function (Backbone, webdesignwill, Sitemap) {

  "use strict";

  var Github = Backbone.Package.extend({

    sitemap : new Sitemap(),

    loaded : function (data) {},
    initialised : function (data) {},
    started : function (data) {},
    stopped : function (data) {},

    ready : function () {
      // Do all rendering related stuff
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});