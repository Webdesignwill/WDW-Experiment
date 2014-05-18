
define('github-SelectUserListItemView', [
  'Backbone',
  'git'
], function (Backbone, git) {

  "use strict";

  var SelectUserListItemView = Backbone.Page.extend({

    tagName : 'li',
    events : {
      'click' : 'handler'
    },

    initialize : function () {},

    handler : function () {
      git.user.url = 'https://api.github.com/users/' + this.options.match;
      git.user.fetch({
        search : this.options.match,
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      git.user.saveSearchHistory(options.search);
      git.navigate('repositories-page');
    },

    error : function () {},

    render : function () {
      this.$el.html(this.options.match);
      return this;
    }

  });

  return SelectUserListItemView;

});