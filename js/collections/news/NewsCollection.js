
define('newsCollection', [
  'Backbone',
  'newsModel',
  'i18n!nls/news'
],

function (Backbone, newsModel, news) {

  "use strict";

  var NewsCollection = Backbone.Collection.extend({

    model : newsModel,

    initialize : function () {
      this.reset(news.items);
    },

    comparator : function (model) {
      var timestamp = model.get('timestamp');
      var article = model.get('article');

      model.set('date', this.convertDate(timestamp));
      model.set('abstract', this.createAbstract(article));

      return timestamp;
    },

    convertDate : function (timestamp) {

      var date = new Date(timestamp);

      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();

      return day + '/' + month + '/' + year;
    },

    createAbstract : function (article) {
      var substring = article.substring(0, 200);
      return substring + ' ...';
    }

  });

  return new NewsCollection();

});