
define([
  'Backbone',
  'require',
  'launchControl'
], function (Backbone, require, launchControl) {

  "use strict";

  var Webdesignwill = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),

    dependencies : [{
      method : function ($dfd, context) {
        require(['UserModel'], function (UserModel) {
          context.user = new UserModel();
          $dfd.resolve();
        });
      }
    },{
      method : function ($dfd, context) {
        require(['Sitemap'], function (Sitemap) {
          context.sitemap = new Sitemap();
          context.sitemap.fetch({
            success : function (model, response, options) {
              $dfd.resolve();
            }
          });
        });
      }
    },{
      method : function ($dfd, context) {
        require(['BodyView'], function (BodyView) {
          new BodyView({el : $('body')});
          $dfd.resolve();
        });
      }
    },{
      method : function ($dfd, context) {
        require(['Router'], function (Router) {
          context.router = new Router();
          context.router.init(context);
          $dfd.resolve();
        });
      }
    }],

    init : function () {

      var self = this;

      launchControl.call(this, {
        context : this,
        initMethods : this.dependencies,
        launch : function () {
          self.$broker.trigger('site:started');
          console.log('%c Webdesignwill has started ', 'background: #444f64; color: #FFFFFF');
        }
      });
    }

  });

  return new Webdesignwill();

});