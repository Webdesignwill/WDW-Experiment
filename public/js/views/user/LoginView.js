
define([
  '$topics',
  'webdesignwill',
  'text!views/user/templates/login.tpl'
], function ($topics, webdesignwill, template) {

  "use strict";

  var LoginView = Backbone.View.extend({

    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function () {
      // TODO This needs to be cleared at some point.
      this.listenTo(webdesignwill.user, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
    },

    render : function () {
      this.$el.html(template);

      new webdesignwill.formsManager.make({
        name : 'login',
        el : this.$el.find('form')
      });

      // this.setFormEls();
      return this;
    },

    setFormEls : function () {

      var validatables = this.$el.find('[validate]');

      var i;
      for(i = 0; i<validatables.length; i++) {
        var $validatable = $(validatables[i]),
              $label = $validatable.closest('label');

        this.formEls[$validatable.attr('name')] = {
          $formEl : $validatable,
          $label : $label,
          $inlineError : $label.find('.inline-error')
        };

      }
      this.$submitBtn = this.$el.find('[type="submit"]');
    },

    submit : function (e) {
      e.preventDefault();
      var self = this;
      webdesignwill.user.login({
        email : this.formEls.email.$formEl.val(),
        password : this.formEls.password.$formEl.val()
      }, function (result, data, status) {
        if(result) { return $topics.publish('modal:close'); }
        self.updateServerErrors(result);
      });
    },

    updateServerErrors : function (result) {
      this.$el[!result ? 'addClass' : 'removeClass']('server-error');
    },

    updateErrors : function (isValid, errors) {
      this.$el[!isValid ? 'addClass' : 'removeClass']('invalid');
      for(var key in this.formEls) {
        this.formEls[key].$label[errors[key] ? 'addClass' : 'removeClass']('invalid');
        this.formEls[key].$inlineError.html(errors[key] ? errors[key] : '');
      }
    }

  });

  return LoginView;

});
