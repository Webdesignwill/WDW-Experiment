
define('AdminBarView', [
  'Backbone',
  'handlebars',
  'webdesignwill',
  'text!admin/views/adminBar/templates/adminBar.tpl'
],

function (Backbone, handlebars, webdesignwill, template) {

  "use strict";

  var AdminBarView = Backbone.View.extend({

    className : 'admin-bar',
    events : {
      'click' : 'handler',
      'click .user-logout' : 'logOut'
    },

    initialize : function () {
      this.setEvents();
      this.setElements();
    },

    setEvents : function () {
      this.listenTo(webdesignwill.user, 'change:loggedin', function (model) {
        this.showAdminBar(model);
      });
      this.listenTo(webdesignwill.page, 'change', function (model) {
        this.render(model.get(model.get('pageType')).model);
      });
    },

    setElements : function () {
      this.$body = $('body');
    },

    handler : function (e) {
      e.preventDefault();
      e.stopPropagation();
      webdesignwill.router.navigate(e.target.pathname, {trigger : true});
    },

    logOut : function (e) {
      e.preventDefault();
      e.stopPropagation();
      webdesignwill.user.set('loggedin', false);
      webdesignwill.router.navigate(webdesignwill.page.get('theme').model.get('path'), {trigger : true});
    },

    showAdminBar : function (model) {
      if(model.get('loggedin')) {
        this.$body.addClass('admin-bar-active');
      } else {
        this.$body.removeClass('admin-bar-active');
        this.$el.empty();
      }

      this.render(webdesignwill.page.get('theme').model);

      return this;
    },

    render : function (newPage) {
      var tpl = handlebars.compile(template);
      var compiled = tpl({
        newPage : newPage.attributes,
        themePage : webdesignwill.page.get('theme').model.attributes
      });

      this.$el.html(compiled);
    }

  });

  return AdminBarView;

});
