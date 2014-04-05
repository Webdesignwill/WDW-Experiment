
define('NavSubView', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!views/nav/templates/subNav.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var NavSubView = Backbone.View.extend({

    tagName : 'li',
    events : {
      'click' : 'navigate'
    },

    initialize : function () {
      this.setEvents();
    },

    setEvents : function () {
      var self = this;
      webdesignwill.on('change:currentPage', function (webdesignwill) {
        self.highlightActive(webdesignwill.get('currentPage'));
      });
    },

    highlightActive : function (currentPage) {
      if(currentPage.model.get('name') === this.model.get('name')) {
        this.$el.addClass('active');
        return;
      }
      this.$el.removeClass('active');
    },

    navigate : function () {
      webdesignwill.router.navigate(this.model.get('path'), {trigger: true});
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);

      return this;
    }

  });

  return NavSubView;

});
