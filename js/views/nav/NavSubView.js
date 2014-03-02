
define('NavSubView', [
  'Backbone',
  'handlebars',
  'appModel',
  'text!views/nav/templates/subNav.tpl'
],

function (Backbone, handlebars, appModel, template) {

  "use strict";

  var NavSubView = Backbone.View.extend({

    tagName : 'li',
    events : {
      'click' : 'navigate'
    },

    initialize : function (element) {
      var self = this;
      this.element = element;
      this.setElements();
      this.setEvents();
    },

    setElements : function () {
      this.$body = $('body');
    },

    setEvents : function () {
      appModel.on('change:navigation', function (ev) {
        self.highlightActive(ev);
      });
    },

    highlightActive : function (ev) {
      if(appModel.get('navigation') === this.element.name) {
        this.$body.removeClass()
              .addClass(this.element.name + '-page');

        this.$el.addClass('active');
      } else {
        this.$el.removeClass('active');
      }
    },

    navigate : function () {
      appModel.router.navigate(this.element.name, {trigger: true});
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(this.element);

      this.$el.html(compiled);

      return this;
    }

  });

  return NavSubView;

});
