
define([
  'Sitemap'
], function (Sitemap) {

  "use strict";

  var App = function () {

    var self = this;

    this.navigate = function (pageName) {
      var pageModel = this.sitemap.get(pageName),
            templatePath = '/js/packages/github/templates/';

      this.require([pageModel.get('page')], function (Page) {
        self.pageFactory.make(templatePath, self.$el, pageModel, Page, null);
      });

    };

    this.init = function (done) {
      this.sitemap = new Sitemap();
      this.sitemap.fetch({
        success : function (model, response, options) {
          self.navigate('signin-page');
          done();
        }
      });
    };
    this.continue = function (done) {
      /* on continue, go to the last page the user was on */
      self.navigate(this.page.get('model').get('map'));
      done();
    };
  };

  return new App();

});