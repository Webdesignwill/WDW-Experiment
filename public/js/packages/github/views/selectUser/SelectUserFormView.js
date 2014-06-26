
define([
  'Backbone',
  'userModel',
  'SelectUserListView',
  'text!views/selectUser/templates/select-user.tpl'
], function (Backbone, userModel, SelectUserListView, template) {

  "use strict";

  var SelectUserFormView = Backbone.Page.extend({

    events : {
      'submit' : 'handler',
      'keyup' : 'keyupHandler'
    },

    initialize : function () {
      this.render();
    },

    setElements : function () {
      this.$searchHistory = this.$el.find('.search-history');
      this.$selectUser = this.$el.find('.select-user');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.selectUserListView = new SelectUserListView({
        el : this.$searchHistory,
        $input : this.$selectUser
      });

      return this;
    },

    handler : function (e) {
      e.preventDefault();
      var search = e.target[0].value;
      userModel.url = 'https://api.github.com/users/' + search;
      userModel.fetch({
        search : search,
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      userModel.saveSearchHistory(options.search);
      git.navigate('repositories-page');
    },

    error : function () {
      alert('Are you sure that user exists?');
    },

    keyupHandler : function (e) {
      e.stopPropagation();
      this.selectUserListView.matchFilter(e.target.value);
    }

  });

  return SelectUserFormView;

});