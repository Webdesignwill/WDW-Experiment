
define('PageControlsView', [
  'Backbone',
  'appModel',
  'handlebars',
  'text!views/pageControls/templates/page-controls.tpl'
], function (Backbone, appModel, handlebars, template) {

  "use strict";

  var PageControlsView = Backbone.View.extend({

    events : {
      'click .next-page' : 'next',
      'click .prev-page' : 'prev'
    },

    initialize : function () {
      this.render();
      this.setElements();
      this.setEvents();
    },

    setElements : function () {
      this.$nextPage = this.$el.find('.next-page');
      this.$nextPageName = this.$nextPage.find('.next-page-name');
      this.$prevPage = this.$el.find('.prev-page');
      this.$prevPageName = this.$prevPage.find('.prev-page-name');
    },

    setEvents : function () {
      var self = this;
      appModel.broker.on('page:change', function (e) {
        self.toggleControls();
      });
    },

    toggleControls : function () {

      var getNextPage = appModel.get('currentPageModel').getNextPage(),
            getPrevPage = appModel.get('currentPageModel').getPrevPage();

      if(!getNextPage) {
        this.$nextPage.addClass('hide');
      } else {
        this.$nextPage.removeClass('hide');
        this.$nextPageName.html(getNextPage.get('name'));
      }
      if(!getPrevPage) {
        this.$prevPage.addClass('hide');
      } else {
        this.$prevPage.removeClass('hide');
        this.$prevPageName.html(getPrevPage.get('name'));
      }
    },

    next : function (e) {
      e.stopPropagation();
      e.preventDefault();
      var path = appModel.get('currentPageModel').getNextPage() ? appModel.get('currentPageModel').getNextPage().get('path') : appModel.get('currentPageModel').get('path');
      appModel.router.navigate(path, {trigger:true});
    },

    prev : function (e) {
      e.stopPropagation();
      e.preventDefault();
      var path = appModel.get('currentPageModel').getPrevPage() ? appModel.get('currentPageModel').getPrevPage().get('path') : appModel.get('currentPageModel').get('path');
      appModel.router.navigate(path, {trigger:true});
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return PageControlsView;

});