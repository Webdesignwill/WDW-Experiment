
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

    initialize : function () {
      this.setEvents();
    },

    setEvents : function () {
      var self = this;
      appModel.broker.on('page:change', function (opts) {
        self.highlightActive(opts);
      });
    },

    highlightActive : function (opts) {
      if(opts.newPageModel.get('name') === this.model.get('name')) {
        this.$el.addClass('active');
        return;
      }
      this.$el.removeClass('active');
    },

    navigate : function () {
      appModel.router.navigate(this.model.get('path'), {trigger: true});
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
