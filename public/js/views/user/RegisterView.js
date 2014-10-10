
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/register.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var RegisterView = Backbone.View.extend({

    render : function () {
      this.$el.html(template);

      webdesignwill.Forms.make({
        name : 'Register',
        el : this.$el.find('form')
      }, this.register);

      return this;
    },

    register : function (model) {
      webdesignwill.user.register({
        email : model.get('email'),
        displayname : model.get('displayname'),
        password : model.get('password')
      }, function (result) {
        if(result) { return $topics.publish('modal:close'); }
      });
    }

  });

  return RegisterView;

});
