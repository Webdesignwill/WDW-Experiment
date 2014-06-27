
define([
  'handlebars',
  'NavView',
  'text!views/header/templates/header.tpl',
  "i18n!nls/header"
],

function (handlebars, NavView, template, header) {

  "use strict";

  var HeaderView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    setElements : function () {
      this.$primaryNav = this.$el.find('#primary-nav');
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(header);

      this.$el.html(compiled);
      this.setElements();

      new NavView({
        el : this.$primaryNav
      });

      return this;
    }

  });

  return HeaderView;

});
