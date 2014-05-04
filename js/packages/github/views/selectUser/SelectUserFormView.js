
define('github-SelectUserFormView', [
  'Backbone',
  'git',
  'github-SelectUserListView',
  'text!github-path/views/selectUser/templates/select-user.tpl'
], function (Backbone, git, SelectUserListView, template) {

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
      git.user.url = 'https://api.github.com/users/' + search;
      git.user.fetch({
        search : search,
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      git.user.saveSearchHistory(options.search);
      git.navigate('repositories-page');
    },

    error : function () {
      alert('Are you sure that user exists?');
    },

    // Global event listener would be better
    keyupHandler : function (e) {
      e.stopPropagation();
      this.selectUserListView.keyupHandler(e.target.value);
    }

  });

  return SelectUserFormView;

});