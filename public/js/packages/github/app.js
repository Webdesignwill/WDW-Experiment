
define([
  'Sitemap',
  'BodyView'
], function (Sitemap, BodyView) {

  "use strict";

  var App = function () {

    var self = this;

    /* Create the wrapper body view and save where we want to append the content
    ================================================= */
    function renderBody () {
      new BodyView({
        el : self.$el
      });
      self.$sectionContent = self.$el.find('#github-section-content');
    }

    this.navigate = function (pageName) {
      var pageModel = this.sitemap.get(pageName),
            templatePath = '/js/packages/github/templates/';

      this.require([pageModel.get('page')], function (Page) {
        self.pageFactory.make(templatePath, self.$sectionContent, pageModel, Page, null);
      });

    };

    this.init = function (done) {

      renderBody();

      /* Create the sitemap and page models and start the package
      ===================================== */
      this.sitemap = new Sitemap();
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.navigate('signin-page');
          done();
        }
      });
    };

    this.continue = function (done) {
      renderBody();
      /* on continue, go to the last page the user was on */
      self.navigate(this.page.get('model').get('map'));
      done();
    };
  };

  return new App();

});