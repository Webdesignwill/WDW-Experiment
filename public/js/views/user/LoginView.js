
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/login.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    render : function () {
      this.$el.html(template);

      $.when(webdesignwill.Forms.make({
        name : 'login',
        el : this.$el.find('form')
      })).then(this.login);

      return this;
    },

    login : function (model) {
      webdesignwill.user.login({
        email : model.get('email'),
        password : model.get('password')
      }, function (result, data, status) {
        if(result) { return $topics.publish('modal:close'); }
      });
    }

  });

  return LoginView;

});
