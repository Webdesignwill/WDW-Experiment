
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/login.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    tagName : 'form',
    interests : ['email', 'password'],
    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function () {
      this.listenTo(webdesignwill.user, 'validated', function (isValid, model, errors) {
        this.updateErrors(errors);
      });
    },

    render : function () {
      this.$el.html(template);
      this.setFormEls();
      return this;
    },

    setFormEls : function () {
      var i;
      for(i = 0; i<this.interests.length; i++) {
        var $formEl = this.$el.find('[name="' + this.interests[i] + '"]'),
              $label = $formEl.closest('label');

        this.formEls[this.interests[i]] = {
          $formEl : $formEl,
          $label : $formEl.closest('label'),
          $inlineError : $label.find('.inline-error')
        };
      }
    },

    submit : function (e) {
      e.preventDefault();
      webdesignwill.user.login({
        email : this.formEls.email.$formEl.val(),
        password : this.formEls.password.$formEl.val()
      }, function (result, data, status) {
        if(result) { return $topics.publish('modal:close'); }
        alert('USER NOT FOUND');
      });
    },

    updateErrors : function (errors) {
      for(var key in this.formEls) {
        this.formEls[key].$label[errors[key] ? 'addClass' : 'removeClass']('invalid');
        this.formEls[key].$inlineError.html(errors[key] ? errors[key] : '');
      }
    }

  });

  return LoginView;

});
