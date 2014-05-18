
define('NavSubView', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!themes/views/nav/templates/subNav.tpl'
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
      webdesignwill.page.on('change:theme', function (model) {
        this.highlightActive(model.get('theme'));
      }, this);
    },

    highlightActive : function (page) {
      if(page.model === this.model) {
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
