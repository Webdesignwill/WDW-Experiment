
define('PageModel', [
  'Backbone',
  'i18n!nls/nav'
],

function (Backbone, content) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    initialize : function () {
      this.setNavSubText();
    },

    setNavSubText : function () {
      var navSubText = content[this.get('name')] && content[this.get('name')].subText || '';
      this.set('navSubText', navSubText);
    }

  });

  return PageModel;

});
