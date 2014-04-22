
define('git', [
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var Github = Backbone.Model.extend({

    page : new Backbone.Model(),
    garbage : [],
    $broker : _.clone(Backbone.Events),

    initialize : function () {
      this.setPackageListeners();
      this.$events = webdesignwill.packageManager.$events;
    },

    init : function ($el) {
      this.setElement($el);
      this.$events.trigger(this.get('name') + ':initialised', {
        type : 'initialised',
        pack : this.get('name')
      });
    },

    start : function () {
      this.navigate();
      this.$events.trigger(this.get('name') + ':started', {
        type : 'started',
        pack : this.get('name')
      });
    },

    stop : function () {
      this.$events.trigger(this.get('name') + ':stopped', {
        type : 'stopped',
        pack : this.get('name')
      });
    },

    continue : function ($el) {
      this.setElement($el);
      this.navigate(); // TODO Continue where we left off
    },

    navigate : function (page, data) {
      var self = this,
            pageName = page !== undefined ? page : 'GH_SigninPage'; // TODO config.startpage

      require([pageName], function (Page) {
        self.goto(Page, pageName);
      });
    },

    goto : function (Page, pageName) {
      this.tearDown();
      var newPage = new Page();

      var page = {
        page : newPage
      };

      this.page.set(page);
      this.garbage.push(page);

      this.$el.html(newPage.render().el);

    },

    tearDown : function () {

      function emptyGarbage (trash) {
        trash.page.close();
      }

      var i;
      for(i = 0;i<this.garbage.length; i++) {
        emptyGarbage(this.garbage[i]);
        this.garbage.splice(i, 1);
      }

    },

    setPackageListeners : function () {
      this.on('change:status', function () {
        console.log('%c ' + this.get('name') + ' package has ' + this.get('status') + ' ', 'background: #7AFF4D; color: #000');
      }, this);
    },

    setElement : function ($el) {
      var $element = $el.find(this.get('name'));
      if($element.length < 1) {
        this.$el = $el;
        return;
      }
      this.$el = $element;
    }

  });

  webdesignwill.packageManager.packages.github = new Github();

});