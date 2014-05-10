
define('HomePage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/theme/home/templates/home.tpl',
  "i18n!nls/home"
],

function (Backbone, handlebars, webdesignwill, template, content) {

  "use strict";

  var HomePage = Backbone.Page.extend({

    id : 'home-page',
    className : 'home-page page',

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return HomePage;

});
