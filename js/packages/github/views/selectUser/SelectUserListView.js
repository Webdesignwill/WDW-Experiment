
define('github-SelectUserListView', [
  'Backbone',
  'git',
  'github-SelectUserListItemView'
], function (Backbone, git, SelectUserListItemView) {

  "use strict";

  var SelectUserListView = Backbone.Page.extend({

    initialize : function () {},

    keyupHandler : function (search) {
      var matches;

      if(search.length > 2) {
        matches = this.findMatches(search);
        if(matches.length > 0) {
          this.renderMatches(matches);
        } else {
          this.clearMatches();
        }
      } else {
        this.clearMatches();
      }

    },

    findMatches : function (search) {
      var sh = git.user.searchHistory,
            matches = [];

      for(var key in sh) {
        if(sh[key].indexOf(search) !== -1) {
          matches.push(sh[key]);
        }
      }
      return matches;
    },

    renderMatches : function (matches) {
      var docFrag = document.createDocumentFragment(),
            selectUserListItemView;

      for(var i = 0; i<matches.length; i++) {
        if(i < 4) {
          selectUserListItemView = new SelectUserListItemView({
            match : matches[i]
          });
          docFrag.appendChild(selectUserListItemView.render().el);
        }
      }
      this.$el.html(docFrag);
    },

    clearMatches : function () {
      this.$el.empty();
    }

  });

  return SelectUserListView;

});