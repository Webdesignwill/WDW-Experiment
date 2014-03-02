
define('HeaderView', [
  'Backbone',
  'handlebars',
  'text!views/header/templates/header.tpl',
  "i18n!nls/credentials"
],

function (Backbone, handlebars, template, credentials) {

  "use strict";

  var HeaderView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(credentials);

      this.$el.html(compiled);

      return this;
    }

  });

  return HeaderView;

});
