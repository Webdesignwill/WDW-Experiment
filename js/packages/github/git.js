
define('git', [
  'Backbone',
  'webdesignwill',
  'github-Sitemap',
  'github-UserModel'
], function (Backbone, webdesignwill, Sitemap, UserModel) {

  "use strict";

  var Github = Backbone.Package.extend({

    sitemap : new Sitemap(),

    loaded : function () {},
    initialised : function () {
      this.user = new UserModel();
    },
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