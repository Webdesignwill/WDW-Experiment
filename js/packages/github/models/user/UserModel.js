
define('github-UserModel', [
  'Backbone'
],

function (Backbone) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    initialize : function () {
      this.repos = new Backbone.Collection();
      this.getSearchHistory();
    },

    saveSearchHistory : function (search) {
      this.searchHistory[search] = search;
      window.localStorage.setItem('wdw-gh-searchHistory', JSON.stringify(this.searchHistory));
    },

    getSearchHistory : function () {
      var searchHistory = window.localStorage.getItem('wdw-gh-searchHistory');
      this.searchHistory = searchHistory ? JSON.parse(searchHistory) : {};
    }

  });

  return UserModel;

});
