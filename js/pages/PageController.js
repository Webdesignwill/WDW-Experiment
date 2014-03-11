
define('PageController', [
    'Backbone',
    'appModel',
    'NavView',
    'HeaderView',
    'StrapView',
    'FooterView',
  ], function (Backbone, appModel, NavView, HeaderView, StrapView, FooterView) {

    "use strict";

    var PageController = Backbone.Page.extend({

      initialize : function () {
        this.setElements();
        this.renderTopTail();
      },

      setElements : function () {
        this.$body = $('body');
        this.$siteHeader = $('#site-header');
        this.$siteStrap = $('#site-strap');
        this.$siteFooter = $('#site-footer-inner');
        this.$primaryNav = $('#primary-nav');
      },

      renderTopTail : function () {
        this.$primaryNav.html(new NavView().render().el);

        new HeaderView({
          el : this.$siteHeader
        });

        new StrapView({
          el : this.$siteStrap
        });

        new FooterView({
          el : this.$siteFooter
        });

      },

      goto : function (newPageModel, Page, options) {

        var opts = options || null;

        var newPage = new Page({
          model : newPageModel,
          options : opts
        });

        this.$el.html(newPage.render().el);

        appModel.broker.trigger('page:change', {
          newPage : newPage,
          newPageModel : newPageModel
        });

        this.setBodyClass(newPageModel.get('name'));

        // this.transitionOut(function () {

          // var page = new Page(opts);
          // self.$el.append(page.render().el);
          // self.transitionIn();

        // });
      },

      setBodyClass : function (name) {
        this.removeExistingPageClasses();
        this.$body.addClass(name + '-page');
      },

      removeExistingPageClasses : function () {
        if(this.$body.attr('class') !== undefined) {
          var classArray = this.$body.attr('class').split(' ');
          for(var i = 0; i < classArray.length; i++) {
            // TODO if has index of page, remove it
            /*

              if(classArray[i].indexOf('sidebar-') !== -1) {
                this.$body.removeClass(classArray[i]);
              }


            */
            this.$body.removeClass(classArray[i]);
          }
        }
      },

      transitionIn : function () {
        this.$el.animate({
          opacity : 1,
          duration : 10
        });
      },

      transitionOut : function (callback) {
        this.$el.animate({
          opacity : 0,
          duration : 10
        }, callback);
      }

    });

    return PageController;

});