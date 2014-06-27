
define([
  'HeaderView',
  'text!templates/body.tpl'
], function (HeaderView, template) {

  "use strict";

  var BodyView = Backbone.View.extend({

    initialize : function () {
      this.render();
      this.setElements();
      this.renderPageComponents();
    },

    setElements : function () {
      this.$header = this.$el.find('#github-header-content');
    },

    renderPageComponents : function () {
      new HeaderView({
        el : this.$header
      });
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return BodyView;

});