
define('NavView', [
  'Backbone',
  'handlebars',
  'NavSubView',
  'pagesCollection'
],

function (Backbone, handlebars, NavSubView, pagesCollection) {

  "use strict";

  var NavView = Backbone.View.extend({

    tagName : 'ul',
    className : 'width-auto',

    initialize : function () {
      this.render();
    },

    render : function () {

      var fragment = document.createDocumentFragment();

      pagesCollection.each(function (pageModel, index, array) {
        if(pageModel.get('nav')) {
          var navSubView = new NavSubView({name : pageModel.get('name'), subText : pageModel.get('navSubText')});
          fragment.appendChild(navSubView.render().el);
        }
      });

      this.$el.html(fragment);

      return this;
    }

  });

  return NavView;

});
