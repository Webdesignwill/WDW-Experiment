
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

    parse : function (model, options) {
      return model;
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
          pageInstance : opts.newPageView
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
    },

    getNextPage : function () {
      var self = this;
      var nextPage = this.collection.filter(function (model) {
        return self.get('nextPage') === model.get('name') && self.get('level') === model.get('level');
      });
      return nextPage[0];
    },

    getPrevPage : function () {
      var self = this;
      var prevPage = this.collection.filter(function (model) {
        return self.get('prevPage') === model.get('name') && self.get('level') === model.get('level');
      });
      return prevPage[0];
    }

  });

  return PageModel;

});
