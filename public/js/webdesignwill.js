
define([
  'require',
  'UserModel'
], function (require, UserModel) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),
    user : new UserModel(),

    init : function (callback) {
      var self = this;

      function fetchSitemap () {
        self.sitemap.fetch({
          success : function (model, response, options) {
            callback();
          }
        });
      }

      require(['Sitemap'], function (Sitemap) {
        self.sitemap = new Sitemap();
        fetchSitemap();
      });

    },

    start : function () {
      this.router.init(this);
      this.$broker.trigger('site:started');
      console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
    }

  });

  return new Webdesignwill();

});