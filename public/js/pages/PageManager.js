
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
        this.setEvents();
        this.renderPageComponents();
      },

      setEvents : function () {
        this.listenTo(webdesignwill.page, 'change:admin', function (model, view) {
          this.$el.addClass('admin-mode');
        });
        this.listenTo(webdesignwill.page, 'change:theme', function (model, view) {
          this.$el.removeClass('admin-mode');
        });
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

      goto : function (pageModel, Page, identifier, pageType) {

        this.tearDown(pageType);

        var newPage = new Page({
          model : pageModel,
          identifier : identifier || null
        });

        var $el = pageType === 'admin' ? this.$adminContentBody : this.$siteContentBody;
        $el.html(newPage.render().el);

        webdesignwill.page.set(pageType, newPage);

        this.toggleClasses(pageModel);
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
      },

      tearDown : function (pageType) {
        var trash = webdesignwill.page.get(pageType);
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