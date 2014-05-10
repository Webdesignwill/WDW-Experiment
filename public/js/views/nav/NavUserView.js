
define('NavUserView', [
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
    },

    render : function () {
      this.$el.html(template);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
    }

  });

  return NavUserView;

});
