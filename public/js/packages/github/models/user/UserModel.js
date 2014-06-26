
define([], function () {

  "use strict";

  var UserModel = Backbone.Model.extend({

    initialize : function () {
      this.repos = new Backbone.Collection();
      this.getSearchHistory();
    },

    parse : function (model) {
      model = this.augmentModel(model);
      return model;
    },

    augmentModel : function (model) {
      model.name = model.name === undefined ? model.login : model.name;
      return model;
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
