
/* BodyView sets the stage, top and tail and other global view bits
========================================= */

define([
  'webdesignwill',
  'HeaderView',
  'PageControlsView',
  'FooterView',
  'SiteContentHeaderView',
  'ModalView',
  '$topics',
  'text!templates/body.tpl'
], function (webdesignwill, HeaderView, PageControlsView, FooterView, SiteContentHeaderView, ModalView, $topics, template) {

  "use strict";

  var BodyView = Backbone.View.extend({

    modal : {
      open : function () {
        this.$el.addClass('modal-open');
      },
      close : function () {
        this.$el.removeClass('modal-open');
      }
    },

    initialize : function () {
      this.render();
      this.setElements();
      this.setSubscriptions();
      this.renderPageComponents();
      this.delegateAnchorClickEvent();
    },

    delegateAnchorClickEvent : function () {
      var self = this;
      if (Backbone.history) { // Could also work with pushstates (&& Backbone.history._hasPushState)
        $(document).delegate("a:not(.anchor)", "click", function (evt) {
          var href = $(this).attr("href");
          var protocol = this.protocol + "//";
          if (href.slice(0, protocol.length) !== protocol) {
            evt.preventDefault();
            self.hrefController(href);
          }
        });
      }
    },

    hrefController : function (href) {
      var argsArray = href.split(':'),
            module = argsArray[0],
            event = argsArray[1],
            argument = argsArray[2] || null;

      /* Pass the module and event name straight to topics */
      if(module && event) {
        $topics.publish(module + ':' + event, argument);
      }
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
      this.$siteModalWindow = this.$el.find('#site-modal-window');
    },

    setSubscriptions : function () {

      $topics.setSubscriptions({
        channel : 'modal',
        events : this.modal
      }, this);

      webdesignwill.$broker.on('site:started', function () {
        this.$el.removeClass('active-loader');
      }, this);

      webdesignwill.page.on('change:page', function (model) {
        this.toggleClasses(model.get('page').model);
      }, this);
    },

    renderPageComponents : function () {

      new ModalView({
        el : this.$siteModalWindow
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
