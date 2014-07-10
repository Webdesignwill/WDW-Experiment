
define([
  'Backbone',
  'text!views/admin/templates/admin-bar.tpl'
],

function (Backbone, template) {

  "use strict";

  var AdminBarView = Backbone.View.extend({

    className : 'admin-bar',

    initialize : function () {
      this.render();
    },

    render : function (newPage) {
      this.$el.html(template);
    }

  });

  return AdminBarView;

});