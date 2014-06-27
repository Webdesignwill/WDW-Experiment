
/* The Factory is called when a page instance needs to be made up
    It also triggers the global page change event
    ======================================== */

define([], function () {

    "use strict";

    var PageFactory = function (module) {

      /* Close down the previous view
      ==================== */
      function tearDown () {
        var trash = module.page.get('page');
        if(trash) {
          trash.close();
        }
      }

      this.make = function (templatePath, $container, pageModel, Page, identifier) {

        /* Create the page instance. Could be DefaultPage, BlogPage etc
        ======================================== */
        function produce (template) {
          var pageIdClass = pageModel.get('name') + '-page';
          var page = new Page({
            model : pageModel,
            template : template,
            id : pageIdClass,
            className : pageIdClass,
            identifier : identifier || null
          });

          $container.html(page.render().el);

          module.page.set({
            page : page,
            model : pageModel
          });
        }

        tearDown();
        $.get(templatePath + '/' + pageModel.get('name') + '.tpl', produce);
      };

    };

    return PageFactory;

});