
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
      this.navigate('signin-page');
    }

  });

  var git = new Github();
  webdesignwill.packageManager.packages.github = git;

  return git;

});