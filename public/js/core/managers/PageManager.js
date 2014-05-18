
define('PageManager', [
    'Backbone',
    'webdesignwill',
    'AdminBarView',
    'HeaderView',
    'PageControlsView',
    'FooterView',
    'SiteContentHeaderView',
    'SiteLoaderView'
  ], function (Backbone, webdesignwill, AdminBarView, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, SiteLoaderView) {

    "use strict";

    var PageManager = Backbone.Page.extend({

      initialize : function () {
        this.setElements();
        this.setEvents();
        this.renderPageComponents();
      },

      setEvents : function () {
        this.listenTo(webdesignwill.page, 'change:pageType', function (model, pageType) {
          this.setPageTypeProperties(pageType);
        });
      },

      setPageTypeProperties : function (pageType) {
        switch (pageType) {
          case 'admin' :
            this.$el.addClass('admin-mode');
          break;
          case 'theme' :
            this.$el.removeClass('admin-mode');
          break;
        }
      },

      setElements : function () {
        this.$siteContentBody = this.$el.find('#site-content-body');
        this.$adminContentBody = this.$el.find('#admin-content-body');
        this.$siteHeader = this.$el.find('#site-header');
        this.$adminBar = this.$el.find('#admin-bar');
        this.$siteFooter = this.$el.find('#site-footer-inner');
        this.$pageControls = this.$el.find('#page-controls');
        this.$siteContentHeader = this.$el.find('#site-content-header');
        this.$siteLoader = this.$el.find('#site-loader');
      },

      renderPageComponents : function () {

        new AdminBarView({
          el : this.$adminBar
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

      goto : function (pageModel, Page, identifier, pageType) {

        this.tearDown(pageType);

        var newPage = new Page({
          pageType : pageType,
          model : pageModel,
          identifier : identifier || null
        });

        var $el = pageType === 'admin' ? this.$adminContentBody : this.$siteContentBody;
        $el.html(newPage.render().el);

        var props = {}; props.pageType = pageType; props[pageType] = newPage;

        webdesignwill.page.set(props);
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
        var trash = webdesignwill.page.get(pageType),
              packages = webdesignwill.packageManager.packages;

        if(trash) {
          trash.close();
        }

        for(var key in packages) {
          packages[key].stop();
        }
      }

    });

    return PageManager;

});