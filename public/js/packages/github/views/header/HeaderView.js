
define([
  'app',
  'handlebars',
  'userModel',
  'text!views/header/templates/header-view.tpl'
], function (app, handlebars, userModel, template) {

  "use strict";

  var HeaderView = Backbone.View.extend({

    events : {
      'click a' : 'handler'
    },

    initialize : function () {
      this.render();
      this.setListeners();
    },

    setListeners : function () {
      userModel.on('change', function () {
        this.render();
      }, this);
    },

    handler : function (e) {
      e.preventDefault();
      userModel.url = 'https://api.github.com/users/' + userModel.get('login');
      userModel.fetch({
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      app.router.navigate('repositories-page'); // TODO circular dependency, this fails
    },

    error : function () {
      alert('Are you sure that user exists?');
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(userModel.attributes);

      this.$el.html(compiled);
      return this;
    }

  });

  return HeaderView;

});