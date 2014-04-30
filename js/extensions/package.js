
define('package', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  Backbone.Package = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : _.clone(Backbone.Events),
    garbage : [],

    initialize : function () {
      this.setPackageListeners();
    },

    init : function () {
      var self = this;
      this.sitemap.fetch({
        success : function (model, response, options) {
          webdesignwill.packageManager.$events.trigger(self.get('name') + ':initialised', {
            type : 'initialised',
            pack : self.get('name')
          });
        }, reset : true
      });
    },

    start : function () {
      webdesignwill.packageManager.$events.trigger(this.get('name') + ':started', {
        type : 'started',
        pack : this.get('name')
      });
    },

    stop : function () {
      this.tearDown();
      webdesignwill.packageManager.$events.trigger(this.get('name') + ':stopped', {
        type : 'stopped',
        pack : this.get('name')
      });
    },

    setPackageListeners : function () {
      this.on('change:status', function (model) {
        if(typeof this[model.get('status')] !== "undefined") {
          this[model.get('status')]();
        }
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    },

    navigate : function (pageName) {
      var self = this,
            pageModel = this.sitemap.get(pageName);

      require([this.prefix + pageModel.get('page')], function (Page) {
        self.goto(pageModel, Page);
      });
    },

    goto : function (pageModel, Page) {
      this.tearDown();
      var newPage = new Page({
        model : pageModel
      });

      var page = {
        page : newPage
      };

      this.garbage.push(page);
      this.get('$el').html(newPage.render().el);
      this.page.set(page);
    },

    tearDown : function () {

      function emptyGarbage (trash) {
        trash.page.close();
        delete trash.page;
      }

      for(var i = 0;i<this.garbage.length; i++) {
        emptyGarbage(this.garbage[i]);
        this.garbage.splice(i, 1);
      }
    }

  });

});