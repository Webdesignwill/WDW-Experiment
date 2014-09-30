
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/login.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    render : function () {
      this.$el.html(template);

      var $formEl = this.$el.find('form'),
            formName = $formEl.data().name;

      webdesignwill.formsManager.loadForm({
        el : $formEl,
        name : formName,
        valid : webdesignwill.user.login,
        invalid : function () { alert('not valid'); }
      });

      return this;
    }

    // submit : function (e) {
    //   e.preventDefault();
    //   webdesignwill.user.login({
    //     email : this.el.email.value,
    //     password : this.el.password.value
    //   }, function (result, data, status) {
    //     if(result) { return $topics.publish('modal:close'); }
    //     alert('USER NOT FOUND');
    //   });
    // }
  });

  return LoginView;

});
