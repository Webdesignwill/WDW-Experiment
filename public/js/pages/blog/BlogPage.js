
define('BlogPage', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!pages/blog/templates/blog.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var BlogPage = Backbone.Page.extend({

    id : 'blog-page',
    className : 'blog-page page',

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return BlogPage;

});
