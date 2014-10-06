
define([
  'SelectUserFormView'
], function (SelectUserFormView) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    setElements : function () {
      this.$selectUser = this.$el.find('#github-select-user');
    },

    render : function () {
      this.$el.html(this.options.template);
      this.setElements();
      new SelectUserFormView({el : this.$selectUser});
      return this;
    }

  });

  return SigninPage;

});