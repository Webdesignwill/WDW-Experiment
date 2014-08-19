
define([
  'handlebars',
  '$topics',
  'webdesignwill',
  'text!views/user/templates/profile.tpl'
], function (handlebars, $topics, webdesignwill, template) {

  "use strict";

  var ProfileView = Backbone.View.extend({

    tagName : 'form',
    className : 'profile-form',
    events : {
      'submit' : 'handler',
      'click #delete-user' : 'deleteMe'
    },

    initialize : function () {
      this.setEvents();
    },

    setEvents : function () {
      this.listenTo(webdesignwill.user, 'change', function () {
        this.render();
      });
    },

    preRender : function (done) {
      webdesignwill.user.getProfile(done);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(webdesignwill.user.attributes);

      this.$el.html(compiled);

      return this;
    },

    handler : function (e) {
      e.preventDefault();
      var user = {};
      for(var key in webdesignwill.user.attributes) {
        if(this.el[key] && this.el[key].value.length > 0) {
          user[key] = this.el[key].value;
        }
      }

      webdesignwill.user.put(user, function (result, data, status) {
        if(!result) { return alert('HANDLE VALIDATION'); }
      });
    },

    deleteMe : function () {
      webdesignwill.user.deleteMe(function (result) {
        if(result) { return $topics.publish('modal:close'); }
        alert('HANDLE ERROR');
      });
    }

  });

  return ProfileView;

});
