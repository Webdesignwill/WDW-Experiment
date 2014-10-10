
define([
  'handlebars',
  '$topics',
  'webdesignwill',
  'text!views/user/templates/profile.tpl'
], function (handlebars, $topics, webdesignwill, template) {

  "use strict";

  var ProfileView = Backbone.View.extend({

    events : {
      'click #delete-user' : 'deleteMe'
    },

    preRender : function (done) {
      webdesignwill.user.getProfile(done);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(webdesignwill.user.attributes);

      this.$el.html(compiled);

      webdesignwill.Forms.make({
        name : 'Profile',
        el : this.$el.find('form'),
        displayAttrs : webdesignwill.user.attributes
      }, this.put);

      return this;
    },

    put : function (model) {
      webdesignwill.user.put({
        displayname : model.get('displayname'),
        company : model.get('company'),
        firstname : model.get('firstname'),
        lastname : model.get('lastname')
      }, function (result, data, status) {
        if(result) {}
      });
    },

    deleteMe : function (e) {
      e.preventDefault();
      webdesignwill.user.deleteMe(function (result) {
        if(result) { return $topics.publish('modal:close'); }
        alert('HANDLE ERROR');
      });
    }

  });

  return ProfileView;

});
