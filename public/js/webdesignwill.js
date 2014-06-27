
define([
  'UserModel'
], function (UserModel) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),
    user : new UserModel(),

    init : function (callback) {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.router.init(self);
          callback();
        }
      });
    },

    start : function () {
      this.$broker.trigger('site:started');
      console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
    }

  });

  return new Webdesignwill();

});