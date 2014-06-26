
define([
  'Backbone',
  'UserModel',
  'PageFactory'
], function (Backbone, UserModel, PageFactory) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),
    user : new UserModel(),

    init : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.start().router.init();
        }
      });

      this.pageFactory = new PageFactory(this);

    },

    start : function () {
      console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
      return this;
    }

  });

  return new Webdesignwill();

});