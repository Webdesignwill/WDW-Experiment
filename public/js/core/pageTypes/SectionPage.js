
define('SectionPage', [
  'Backbone',
  'handlebars'
],

function (Backbone, handlebars) {

  "use strict";

  var SectionPage = Backbone.Page.extend({

    className : 'section-page',

    render : function () {
      this.$el.html(options.template);
      return this;
    }

  });

  return SectionPage;

});
