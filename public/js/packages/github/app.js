
define([
  'require'
], function (require) {

  "use strict";

  var App = function () {

    var self = this;

    this.dependencies = [{
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
      method : loadBody
    },{
      method : function ($dfd, context) {
        /* First time initialize, navigate to first page
        ================== */
        context.router.navigate('signin-page');
      }
    }];

    function loadBody ($dfd, context) {
      require(['BodyView'], function (BodyView) {

        /* Load and set the body wrapper view
        ======================= */
        new BodyView({el : context.$el});
        context.$sectionContent = context.$el.find('#github-section-content');
        if($dfd) $dfd.resolve();
      });
    }

    this.continue = function (done) {
      /* on continue, go to the last page the user was on */
      loadBody(null, this);
      self.router.navigate(this.page.get('model').get('map'));
      done();
    };
  };

  return new App();

});