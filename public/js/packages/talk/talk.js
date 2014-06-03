
define([
  'Backbone',
  'webdesignwill',
  'talk-Sitemap'
], function (Backbone, webdesignwill, Sitemap) {

  "use strict";

  var Talk = Backbone.Package.extend({

    sitemap : new Sitemap(),

    ready : function () {
      this.navigate('posts-page');
    }

  });

  var talk = new Talk();
  webdesignwill.packageManager.packages.talk = talk;

  return talk;

});