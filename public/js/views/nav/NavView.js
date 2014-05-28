
define('NavView', [
  'Backbone',
  'webdesignwill',
  'NavSubView',
  'NavUserView',
  'text!views/nav/templates/nav.tpl'
],

function (Backbone, webdesignwill, NavSubView, NavUserView, template) {

  "use strict";

  var NavView = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    setElements : function () {
      this.$nav = this.$el.find('.nav');
      this.$navUser = this.$el.find('.nav-user');
    },

    render : function () {

      this.$el.html(template);
      this.setElements();

      var navUserView = new NavUserView({
        el : this.$navUser
      });

      this.renderNav();

      return this;
    },

    renderNav : function () {
      var fragment = document.createDocumentFragment(),
            sitemap = webdesignwill.sitemap.attributes;

      for(var key in sitemap){
        if(sitemap[key].get('nav')) {
          var navSubView = new NavSubView({model : sitemap[key]});
          fragment.appendChild(navSubView.render().el);
        }
      }

      this.$nav.html(fragment);
    }

  });

  return NavView;

});
