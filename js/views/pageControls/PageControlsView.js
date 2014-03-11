
define('PageControlsView', [
  'Backbone',
  'appModel',
  'text!views/pageControls/templates/page-controls.tpl'
], function (Backbone, appModel, template) {

  "use strict";

  var PageControlsView = Backbone.View.extend({

    events : {
      'click' : 'navigate'
    },

    initialize : function () {
      this.render();
      this.setElements();
      this.setEvents();
    },

    setElements : function () {
      this.$nextPage = this.$el.find('.next-page');
      this.$prevPage = this.$el.find('.prev-page');
    },

    setEvents : function () {
      var self = this;
      appModel.broker.on('page:change', function (options) {
        self.toggleControls(options);
      });
    },

    toggleControls : function (options) {
      if(!appModel.get('currentPageModel').getNextPage()) {
        this.$nextPage.addClass('hide');
      } else {
        this.$nextPage.removeClass('hide');
      }
      if(!appModel.get('currentPageModel').getPrevPage()) {
        this.$prevPage.addClass('hide');
      } else {
        this.$prevPage.removeClass('hide');
      }
    },

    navigate : function (e) {
      e.stopPropagation();
      var path;
      switch (e.target.className) {
        case 'next-page' :
          path = appModel.get('currentPageModel').getNextPage() ? appModel.get('currentPageModel').getNextPage().get('path') : appModel.get('currentPageModel').get('path');
        break;
        case 'prev-page' :
          path = appModel.get('currentPageModel').getPrevPage() ? appModel.get('currentPageModel').getPrevPage().get('path') : appModel.get('currentPageModel').get('path');
        break;
      }
      appModel.router.navigate(path, {trigger:true});
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return PageControlsView;

});