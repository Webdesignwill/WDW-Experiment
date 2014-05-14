
define('AdminBarView', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!views/gears/adminBar/templates/adminBar.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var AdminBarView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return AdminBarView;

});
