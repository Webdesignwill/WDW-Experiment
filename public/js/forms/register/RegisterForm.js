
define([
  'RegisterModel',
  'text!register/templates/register.tpl'
], function (RegisterModel, template) {

  "use strict";

  var RegisterForm = Backbone.Forms.extend({

    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function (options) {

      this.options = options;
      this.model = new RegisterModel();

      this.listenTo(this.model, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
      this.render();
    },

    render : function () {
      this.$el.html(template);
      this.setFormEls();
      return this;
    },

    submit : function (e) {
      e.preventDefault();

      this.model.set({
        email : this.formEls.email.$formEl.val(),
        displayname : this.formEls.displayname.$formEl.val(),
        password : this.formEls.password.$formEl.val(),
        confirmpassword : this.formEls.confirmpassword.$formEl.val()
      }, {validate : true});

      if(this.model.isValid()) {
        this.options.callback(this.model);
      }
    },

    setFormEls : function () {

      var validatables = this.$el.find('[validate]');

      for(var i = 0; i<validatables.length; i++) {
        var $validatable = $(validatables[i]),
              $label = $validatable.closest('label');

        this.formEls[$validatable.attr('name')] = {
          $formEl : $validatable,
          $label : $label,
          $inlineError : $label.find('.inline-error')
        };
      }
    },

    updateErrors : function (isValid, errors) {
      this.$el[!isValid ? 'addClass' : 'removeClass']('invalid');
      for(var key in this.formEls) {
        this.formEls[key].$label[errors[key] ? 'addClass' : 'removeClass']('invalid');
        this.formEls[key].$inlineError.html(errors[key] ? errors[key] : '');
      }
    }

  });

  return RegisterForm;

});