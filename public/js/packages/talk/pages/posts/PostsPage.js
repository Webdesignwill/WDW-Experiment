
define([
  'Backbone',
  'talk',
  'text!talk-path/pages/posts/templates/posts.tpl'
], function (Backbone, talk, template) {

  "use strict";

  var PostsPgae = Backbone.Page.extend({

    id : 'posts-page',
    className : 'posts-page page',

    initialize : function () {},

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return PostsPage;

});