
define([
  'handlebars',
  'webdesignwill',
  'text!views/nav/templates/navUser.tpl'
],

function (handlebars, webdesignwill, template) {

  "use strict";

  var NavUserView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setEvents();
    },

    setEvents : function () {
      this.listenTo(webdesignwill.user, 'change', function () {
        this.render();
      });
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
