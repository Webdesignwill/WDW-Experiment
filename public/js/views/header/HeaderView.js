
define('HeaderView', [
  'Backbone',
  'handlebars',
  'text!views/header/templates/header.tpl',
  "i18n!nls/header"
],

function (Backbone, handlebars, template, header) {

  "use strict";

  var HeaderView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(header);

      this.$el.html(compiled);

      return this;
    }

  });

  return HeaderView;

});
