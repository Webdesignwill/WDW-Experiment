
define([
  'require',
  '$topics',
  'text!views/modal/templates/modal.tpl'
], function (require, $topics, template) {

  var ModalView = Backbone.View.extend({

    interests : {
      open : function (pageName) {
        var self = this;
        require([pageName], function (Page) {
          var page = new Page();
          self.$modalContent.html(page.render().el);
        });
      },
      close : function () {
        this.$modalContent.empty();
      }
    },

    initialize : function () {
      this.setSubscriptions();
      this.render();
    },

    setSubscriptions : function () {
      $topics.setSubscriptions({
        channel : 'modal',
        events : this.interests
      }, this);
    },

    setElements : function () {
      this.$closeBtn = this.$el.find('.close-btn');
      this.$modalContent = this.$el.find('.modal-content');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();
      return this;
    }

  });

  return ModalView;

});