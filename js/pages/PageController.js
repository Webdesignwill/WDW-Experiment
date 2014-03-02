
define('PageController', [
    'Backbone',
    'appModel',
    'NavView',
    'HeaderView',
    'StrapView',
    'FooterView',
    // 'pagesCollection'
// ], function (Backbone, appModel, NavView, HeaderView, StrapView, FooterView, pagesCollection) {
  ], function (Backbone, appModel, NavView, HeaderView, StrapView, FooterView) {

    "use strict";

    var PageController = Backbone.Page.extend({

      initialize : function () {
        this.setElements();
        this.renderTopTail();
      },

      setElements : function () {
        this.$siteHeader = $('#site-header');
        this.$siteStrap = $('#site-strap');
        this.$siteFooter = $('#site-footer');
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

      goto : function (PageConstructor, page, options) {
        var self = this,
              obj = options || null;

        appModel.set('currentPage', page);

        this.transitionOut(function () {
          // self.closePages();
          var pageInstance = new PageConstructor(obj);
          self.$el.append(pageInstance.render().el);
          self.transitionIn();
          // pagesCollection.add(pageInstance);
        });
      },

      closePages : function () {
        if(pagesCollection.length > 0) {
          pagesCollection.each(function (model, index, array) {
            if(model.attributes.close !== undefined && typeof model.attributes.close === 'function') {
              model.attributes.close();
              pagesCollection.remove(model);
            }
          });
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