
define('webdesignwill', [
  'Backbone',
  'UserModel'
], function (Backbone, UserModel) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),
    user : new UserModel(),

    initWebdesignwill : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.start().router.initRouter();
        },
      });
    },

    start : function () {
      console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
      return this;
    }

  });

  return new Webdesignwill();

});