
/* BodyView sets the stage, top and tail and other global view bits
========================================= */

define([
  'Backbone',
  'webdesignwill',
  'topics',
  'HeaderView',
  'PageControlsView',
  'FooterView',
  'SiteContentHeaderView',
  'SiteLoaderView'
], function (Backbone, webdesignwill, topics, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

  "use strict";

  var BodyView = Backbone.View.extend({

    initialize : function () {
      this.setElements();
      this.setSubscriptions();
      this.renderPageComponents();
    },

    setElements : function () {
      this.$siteHeader = this.$el.find('#site-header');
      this.$siteFooter = this.$el.find('#site-footer-inner');
      this.$pageControls = this.$el.find('#page-controls');
      this.$siteContentHeader = this.$el.find('#site-content-header');
      this.$siteLoader = this.$el.find('#site-loader');
    },

    setSubscriptions : function () {

      var self = this;

      /* Listen for the webdesignwill ready call and call the render method
      =========================================== */

      var subscriptions = {
        started : function () {
          self.renderPageComponents();
        }
      };

      topics.setSubscriptions({
        channel : 'webdesignwill',
        subscriptions : subscriptions
      });

      webdesignwill.page.on('change:page', function (model) {
        this.toggleClasses(model.get('page').model);
      }, this);
    },

    renderPageComponents : function () {

      new SiteLoaderView({
        el : this.$siteLoader
      });

      new HeaderView({
        el : this.$siteHeader
      });

      new SiteContentHeaderView({
        el : this.$siteContentHeader
      });

      new PageControlsView({
        el : this.$pageControls
      });

      new FooterView({
        el : this.$siteFooter
      });

      return this;
    },

    render : function () {
      // Yeeeeeeeesss
      return this;
    },

    toggleClasses : function (pageModel) {
      if(this.$el.attr('class') !== undefined) {
        var classArray = this.$el.attr('class').split(' ');
        for(var i = 0; i < classArray.length; i++) {
          if(classArray[i].indexOf('-page') !== -1) {
            this.$el.removeClass(classArray[i]);
          }
        }
      }
      this.$el.addClass(pageModel.get('map'));
    }

  });

  return BodyView;

});
