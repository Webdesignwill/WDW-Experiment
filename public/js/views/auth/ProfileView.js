
define([
  'handlebars',
  'webdesignwill',
  'text!views/auth/templates/profile.tpl'
], function (handlebars, webdesignwill, template) {

  "use strict";

  var ProfileView = Backbone.View.extend({

    tagName : 'form',
    className : 'profile-form',

    initialize : function () {},

    preRender : function (done) {
      webdesignwill.user.getProfile(done);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(webdesignwill.user.attributes);

      this.$el.html(compiled);

      return this;
    }

  });

  return ProfileView;

});
