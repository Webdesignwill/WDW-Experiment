
define('StrapView', [
  'Backbone',
  'handlebars',
  'text!views/strap/templates/strap.tpl',
  "i18n!nls/strap"
],

function (Backbone, handlebars, template, content) {

  "use strict";

  var StrapView = Backbone.View.extend({

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return StrapView;

});
