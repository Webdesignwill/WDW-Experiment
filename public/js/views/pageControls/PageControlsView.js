
define('PageControlsView', [
  'Backbone',
  'webdesignwill',
  'handlebars',
  'text!views/pageControls/templates/page-controls.tpl'
], function (Backbone, webdesignwill, handlebars, template) {

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
      webdesignwill.page.on('change:page', this.toggleControls, this);
    },

    next : function (e) {
      e.stopPropagation();
      e.preventDefault();
      debugger;
      var path = webdesignwill.page.get('theme').model.getNextPage('path');
      webdesignwill.router.navigate(path, {trigger:true});
    },

    prev : function (e) {
      e.stopPropagation();
      e.preventDefault();
      var path = webdesignwill.page.get('theme').model.getPrevPage('path');
      webdesignwill.router.navigate(path, {trigger:true});
    },

    toggleControls : function (model) {
debugger;
      var getNextPage = model.get('page').model.getNextPage(),
            getPrevPage = model.get('page').model.getPrevPage();

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

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return PageControlsView;

});