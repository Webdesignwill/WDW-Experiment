
define('AdminHome', [
  'Backbone',
  'webdesignwill',
  'text!admin/pages/home/templates/admin-home.tpl'
],

function (Backbone, webdesignwill, template) {

  "use strict";

  var AdminHome = Backbone.Page.extend({

    tagName : 'form',
    id : 'admin-home-page',
    className : 'admin-home-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return AdminHome;

});
