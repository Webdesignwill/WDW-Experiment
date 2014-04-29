
define('git', [
  'Backbone',
  'webdesignwill',
  'github-Sitemap'
], function (Backbone, webdesignwill, Sitemap) {

  "use strict";

  var Github = Backbone.Package.extend({

    sitemap : new Sitemap(),
    prefix : 'github-',

    loaded : function () {},
    initialised : function () {},
    started : function () {},
    stopped : function () {},

    ready : function () {
      this.navigate(this.sitemap.get('signin-page'));
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});