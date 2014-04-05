
define('PageController', [
    'Backbone',
    'webdesignwill',
    'NavView',
    'HeaderView',
    'StrapView',
    'PageControlsView',
    'FooterView',
    'SiteContentHeaderView',
    'SiteLoaderView'
  ], function (Backbone, webdesignwill, NavView, HeaderView, StrapView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

    "use strict";

    var PageController = Backbone.Page.extend({

      garbage : [],

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

      goto : function (pageModel, Page, identifier) {

        this.tearDown();
        pageModel.set('currentPage', true);

        var page = new Page({
          model : pageModel,
          identifier : identifier || null
        });

        var newPageProps = {
          page : page,
          model : pageModel
        };

        webdesignwill.set('currentPage', newPageProps);
        this.garbage.push(newPageProps);

        this.$el.html(page.render().el);
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

        function changeCurrentPageStatus (pageModel) {
          if(pageModel.get('currentPage')) {
            pageModel.set('currentPage', false);
          }
        }

        var i;
        for(i = 0;i<this.garbage.length; i++) {
          emptyGarbage(this.garbage[i]);
          changeCurrentPageStatus(this.garbage[i].model);
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

    return PageController;

});