
define('PageManager', [
    'Backbone',
    'webdesignwill',
    'NavView',
    'HeaderView',
    'PageControlsView',
    'FooterView',
    'SiteContentHeaderView',
    'SiteLoaderView'
  ], function (Backbone, webdesignwill, NavView, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

    "use strict";

    var PageManager = Backbone.Page.extend({

      garbage : [],

      initialize : function () {
        this.setElements();
        this.renderPageComponents();
      },

      setElements : function () {
        this.$body = $('body');
        this.$siteHeader = $('#site-header');
        this.$siteFooter = $('#site-footer-inner');
        this.$primaryNav = $('#primary-nav');
        this.$pageControls = $('#page-controls');
        this.$siteContentHeader = $('#site-content-header');
        this.$siteLoader = $('#site-loader');
      },

      renderPageComponents : function () {

        new NavView({
          el : this.$primaryNav
        });

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

        this.garbage.push(page);

        this.$el.html(newPage.render().el);
        webdesignwill.page.set(page);

        this.setBodyClass(pageModel.get('map'));

      },

      setBodyClass : function (map) {
        this.removeExistingBodyClasses();
        this.$body.addClass(map);
      },

      tearDown : function () {

        function emptyGarbage (trash) {
          trash.page.close();
          delete trash.page;
        }

        function stopPackages (trash) {
          var packages = trash.page.model.get('packages');
          if(packages) {
            for(var i = 0; i<packages.length; i++) {
              webdesignwill.packageManager.packages[packages[i]].stop();
            }
          }
        }

        for(var i = 0;i<this.garbage.length; i++) {
          stopPackages(this.garbage[i]);
          emptyGarbage(this.garbage[i]);
          this.garbage.splice(i, 1);
        }

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

    return PageManager;

});