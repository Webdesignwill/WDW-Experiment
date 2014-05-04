
define('github-SelectUserListItemView', [
  'Backbone'
], function (Backbone) {

  "use strict";

  var SelectUserListItemView = Backbone.Page.extend({

    tagName : 'li',
    events : {
      'click' : 'handler',
      'focus' : 'handler'
    },

    initialize : function () {},

    handler : function (e) {
      e.stopPropagation();
      this.options.$input.val(this.options.match).focus();
    },

    render : function () {
      this.$el.html(this.options.match);
      return this;
    }

  });

  return SelectUserListItemView;

});