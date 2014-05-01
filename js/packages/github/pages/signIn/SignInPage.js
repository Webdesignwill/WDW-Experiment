
define('github-SigninPage', [
  'Backbone',
  'git',
  'handlebars',
  'text!github-path/pages/signIn/templates/sign-in.tpl'
], function (Backbone, git, handlebars, template) {

  "use strict";

  var SigninPage = Backbone.Page.extend({

    id : 'github-signin-page',
    className : 'github-signin-page page',
    events : {
      'submit .input-button-combo' : 'formHandler',
      'keyup .search-users' : 'keyupHandler'
    },

    initialize : function () {},

    setElements : function () {
      this.$searchHistory = this.$el.find('.search-history');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();
      return this;
    },

    formHandler : function (e) {
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

    keyupHandler : function (e) {
      var search = e.target.value,
            matches;

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
      // TODO abstraction to view
      var docFrag = document.createDocumentFragment();
      for(var i = 0; i<matches.length; i++) {
        docFrag.appendChild($('<li>' + matches[i] + '</li>')[0]);
      }
      this.$searchHistory.html(docFrag);
    },

    clearMatches : function () {
      this.$searchHistory.empty();
    }

  });

  return SigninPage;

});