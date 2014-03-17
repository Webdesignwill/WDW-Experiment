
define('PageController', [
    'Backbone',
    'appModel',
    'NavView',
    'HeaderView',
    'StrapView',
    'PageControlsView',
    'FooterView',
    'SiteContentHeaderView',
    'SiteLoaderView'
  ], function (Backbone, appModel, NavView, HeaderView, StrapView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

    "use strict";

    var PageController = Backbone.Page.extend({

      initialize : function () {
        this.setElements();
        this.renderPageComponents();
      },

      setElements : function () {
        this.$body = $('body');
        this.$siteHeader = $('#site-header');
        this.$siteStrap = $('#site-strap');
        this.$siteFooter = $('#site-footer-inner');
        this.$primaryNav = $('#primary-nav');
        this.$pageControls = $('#page-controls');
        this.$siteContentHeader = $('#site-content-header');
        this.$siteLoader = $('#site-loader');
      },

      renderPageComponents : function () {

        new SiteLoaderView({
          el : this.$siteLoader
        });

        this.$primaryNav.html(new NavView().render().el);

        new HeaderView({
          el : this.$siteHeader
        });

        new StrapView({
          el : this.$siteStrap
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

      },

      goto : function (newPageModel, Page, options) {

        var opts = options || null;

        var newPageView = new Page({
          model : newPageModel,
          options : opts
        });

        this.$el.html(newPageView.render().el);

        appModel.broker.trigger('page:change', {
          newPageView : newPageView,
          newPageModel : newPageModel
        });

        this.setBodyClass(newPageModel.get('name'));

      },

      setBodyClass : function (name) {
        this.removeExistingBodyClasses();
        this.$body.addClass(name + '-page');
      },

      removeExistingBodyClasses : function () {
        if(this.$body.attr('class') !== undefined) {
          var classArray = this.$body.attr('class').split(' ');
          for(var i = 0; i < classArray.length; i++) {
            if(classArray[i].indexOf('-page') !== -1) {
              this.$body.removeClass(classArray[i]);
            }
          }
        }
      }

    });

    return PageController;

});