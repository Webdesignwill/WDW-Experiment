
define('NavView', [
  'Backbone',
  'webdesignwill',
  'NavSubView'
],

function (Backbone, webdesignwill, NavSubView) {

  "use strict";

  var NavView = Backbone.View.extend({

    tagName : 'ul',
    className : 'top-trim width-auto',

    initialize : function () {
      this.render();
    },

    render : function () {

      var fragment = document.createDocumentFragment(),
            sitemap = webdesignwill.sitemap.attributes;

      for(var key in sitemap){
        if(sitemap[key].get('nav')) {
          var navSubView = new NavSubView({model : sitemap[key]});
          fragment.appendChild(navSubView.render().el);
        }
      }

      this.$el.html(fragment);

      return this;
    }

  });

  return NavView;

});
