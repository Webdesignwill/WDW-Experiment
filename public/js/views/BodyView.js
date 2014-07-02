
/* BodyView sets the stage, top and tail and other global view bits
========================================= */

define([
  'webdesignwill',
  'HeaderView',
  'PageControlsView',
  'FooterView',
  'SiteContentHeaderView',
  'text!templates/body.tpl'
], function (webdesignwill, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, template) {

  "use strict";

  var BodyView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setElements();
      this.setSubscriptions();
      this.renderPageComponents();
    },

    render : function () {
      this.$el.prepend(template);
      return this;
    },

    setElements : function () {
      this.$siteHeader = this.$el.find('#site-header');
      this.$siteFooter = this.$el.find('#site-footer-inner');
      this.$pageControls = this.$el.find('#page-controls');
      this.$siteContentHeader = this.$el.find('#site-content-header');
      this.$siteContentBody = this.$el.find('#site-content-body');
    },

    setSubscriptions : function () {

      webdesignwill.$broker.on('site:started', function () {
        this.$el.removeClass('active-loader');
      }, this);

      webdesignwill.page.on('change:page', function (model) {
        this.toggleClasses(model.get('page').model);
      }, this);
    },

    renderPageComponents : function () {

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
