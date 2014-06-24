
define([
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

        var page,
              self = this;

        function createViewInstance (template) {

          var pageIdClass = pageModel.get('name') + '-page';

          tearDown();

          page = new Page({
            model : pageModel,
            template : template,
            id : pageIdClass,
            className : pageIdClass,
            $container : self.$siteContentBody,
            identifier : identifier || null
          });

          webdesignwill.page.set({page : page});
          self.toggleClasses(pageModel);
        }

        function tearDown () {
          var trash = webdesignwill.page.get('page'),
                packages = webdesignwill.packageManager.packages;

          if(trash) {
            trash.close();
          }

          for(var key in packages) {
            packages[key].stop();
          }
        }

        $.get('/js/templates/' + pageModel.get('name') + '/' + pageModel.get('name') + '.tpl', createViewInstance);

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

    return PageManager;

});