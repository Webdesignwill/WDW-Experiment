
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

      /* Abstract to core. core/models/sitemap etc etc
      As opposed to getting all of these like this, it might be better to have a
      core require with all the core models, collections etc.
      Worth exploring
      ============================== */

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
    },{
      method : function ($dfd, context) {
        base_require(['forms'], function (config) {
          var req = window.require(config(), function () {
            load();
          });
          function load () {
            req(['FormsManager'], function (FormsManager) {
              context.formsManager = FormsManager;
              $dfd.resolve();
            });
          }
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