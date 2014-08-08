
define([
  '$topics',
  'webdesignwill',
  'text!views/auth/templates/register.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var RegisterView = Backbone.View.extend({

    tagName : 'form',
    className : 'register-form',
    events : {
      'submit' : 'handler'
    },

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      webdesignwill.user.register({
        email : this.el.email.value,
        displayname : this.el.displayname.value,
        password : this.el.password.value
      }, function (result) {
        if(result) { return $topics.publish('modal:close'); }
      });
    }

  });

  return RegisterView;

});
