
define('PacksPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/packs/templates/packs.tpl',
  "i18n!nls/packs"
], function (Backbone, handlebars, webdesignwill, template, content) {

  "use strict";

  var PacksPage = Backbone.Page.extend({

    id : 'packs-page',
    className : 'packs-page page',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return PacksPage;

});
