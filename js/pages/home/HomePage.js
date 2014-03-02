
define('HomePage', [
  'Backbone',
  'handlebars',
  'appModel',
  'text!pages/home/templates/home.tpl',
  "i18n!nls/home"
],

function (Backbone, handlebars, appModel, template, content) {

  "use strict";

  var HomePage = Backbone.Page.extend({

    id : 'home-page',
    className : 'width-auto home-page',

    events : {
      'click #giant-button' : 'navigate'
    },

    navigate : function () {
      appModel.router.navigate('this', {trigger: true});
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(content);

      this.$el.html(compiled);

      return this;
    }

  });

  return HomePage;

});
