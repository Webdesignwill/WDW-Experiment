
define('ProfilePage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/admin/profile/templates/profile.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var ProfilePage = Backbone.Page.extend({

    id : 'profile-page',
    className : 'profile-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return ProfilePage;

});
