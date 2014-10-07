
define([
  'app',
  'userModel'
], function (app, userModel) {

  "use strict";

  var SelectUserListItemView = Backbone.Page.extend({

    tagName : 'li',
    events : {
      'click' : 'handler'
    },

    initialize : function (options) {
      this.options = options;
    },

    handler : function () {
      userModel.url = 'https://api.github.com/users/' + this.options.match;
      userModel.fetch({
        search : this.options.match,
        success : this.success,
        error : this.error
      });
    },

    success : function (collection, response, options) {
      userModel.saveSearchHistory(options.search);
      app.router.navigate('repositories-page');
    },

    error : function () {},

    render : function () {
      this.$el.html(this.options.match);
      return this;
    }

  });

  return SelectUserListItemView;

});