
define('PageManager', [
    'Backbone',
    'webdesignwill',
    'HeaderView',
    'PageControlsView',
    'FooterView',
    'SiteContentHeaderView',
    'SiteLoaderView'
  ], function (Backbone, webdesignwill, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

    "use strict";

    var PageManager = Backbone.Page.extend({

      initialize : function () {
        this.setElements();
        this.renderPageComponents();
      },

      setElements : function () {
        this.$siteContentBody = this.$el.find('#site-content-body');
        this.$adminContentBody = this.$el.find('#admin-content-body');
        this.$siteHeader = this.$el.find('#site-header');
        this.$siteFooter = this.$el.find('#site-footer-inner');
        this.$pageControls = this.$el.find('#page-controls');
        this.$siteContentHeader = this.$el.find('#site-content-header');
        this.$siteLoader = this.$el.find('#site-loader');
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

      },

      goto : function (pageModel, Page, identifier) {

        this.tearDown();

        var newPage = new Page({
          model : pageModel,
          identifier : identifier || null
        });

        var page = {
          page : newPage
        };

        var $renderEl = pageModel.get('admin') ? this.$adminContentBody : this.$siteContentBody;

        $renderEl.html(newPage.render().el);
        this.toggleClasses(pageModel);

        webdesignwill.page.set(page);

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

        var ad = pageModel.get('admin');
        if(ad) {
          this.$el.addClass('admin-mode');
          return;
        }
        this.$el.removeClass('admin-mode');

      },

      tearDown : function () {
        var trash = webdesignwill.page.get('page');
        if(trash) {
          var packages = trash.model.get('packages');
          if(packages) {
            for(var i = 0; i<packages.length; i++) {
              webdesignwill.packageManager.packages[packages[i]].stop();
            }
          }
          trash.close();
        }
      }

    });

    return PageManager;

});