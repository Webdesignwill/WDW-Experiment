
define([
  'ProfileModel',
  'handlebars',
  'text!profile/templates/profile.tpl'
], function (ProfileModel, handlebars, template) {

  "use strict";

  var ProfileForm = Backbone.Forms.extend({

    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function (options) {

      this.options = options;
      this.model = new ProfileModel();

      this.listenTo(this.model, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(this.options.displayAttrs);

      this.$el.html(compiled);

      this.setFormEls();
      return this;
    },

    submit : function (e) {
      e.preventDefault();

      var user = {};
      for(var key in this.model.attributes) {
        if(this.el[key] && this.el[key].value.length > 0) {
          user[key] = this.el[key].value;
        }
      }

      this.model.set({
        displayname : this.formEls.displayname.$formEl.val(),
        company : this.formEls.company.$formEl.val(),
        firstname : this.formEls.firstname.$formEl.val(),
        lastname : this.formEls.lastname.$formEl.val()
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

  return ProfileForm;

});