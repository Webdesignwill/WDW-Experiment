
define([
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!views/nav/templates/navUser.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var NavUserView = Backbone.View.extend({

    events : {
      'click' : 'handler'
    },

    initialize : function () {
      this.render();
      this.setEvents();
    },

    setEvents : function () {
      this.listenTo(webdesignwill.user, 'change', function () {
        this.render();
      });
    },

    handler : function (e) {
      e.stopPropagation();
      e.preventDefault();
      webdesignwill.user.set('loggedin', true);
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(webdesignwill.user.attributes);

      this.$el.html(compiled);

      return this;
    }

  });

  return NavUserView;

});
