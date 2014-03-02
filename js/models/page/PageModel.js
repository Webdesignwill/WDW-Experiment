
define('PageModel', [
  'Backbone',
  'appModel',
  'i18n!nls/nav'
],

function (Backbone, appModel, content) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    initialize : function () {
      this.setNavSubText();
      this.setEvents();
    },

    setEvents : function () {
      var self = this;
      appModel.broker.on('page:change', function (opts) {
        self.toggleCurrentPage(opts);
      });
    },

    toggleCurrentPage : function (opts) {
      if(this.cid === opts.newPageModel.cid) {
        this.set({
          currentPage : true,
          pageInstance : opts.newPage
        });
        return;
      }
      this.closePageInstance();
    },

    closePageInstance : function () {
      var pageInstance = this.get('pageInstance');
      if(pageInstance) {
        pageInstance.close();
        this.unset('pageInstance', {silent : true});
      }
      this.set('currentPage', false);
    },

    setNavSubText : function () {
      var navSubText = content[this.get('name')] && content[this.get('name')].subText || '';
      this.set('navSubText', navSubText);
    }

  });

  return PageModel;

});
