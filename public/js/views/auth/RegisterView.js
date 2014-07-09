
define([
  '$topics',
  'webdesignwill',
  'RegisterModel',
  'text!views/auth/templates/register.tpl'
], function ($topics, webdesignwill, RegisterModel, template) {

  "use strict";

  var RegisterView = Backbone.View.extend({

    tagName : 'form',
    className : 'register-form',
    events : {
      'submit' : 'handler'
    },

    initialize : function () {
      this.registerModel = new RegisterModel();
    },

    render : function () {
      this.$el.html(template);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      webdesignwill.user.url = webdesignwill.user.urls.register;
      webdesignwill.user.save({
        email : this.el.email.value,
        password : this.el.password.value
      },{
        wait : true,
        success : function (model, response, options) {
          $topics.publish('modal:close');
        },
        error : function (model, response, options) {
          alert(response.responseJSON.message[0]);
        }
      });
    }

  });

  return RegisterView;

});
