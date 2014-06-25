
/* The Factory is called when a page instance needs to be made up
    It also triggers the global page change event
    ======================================== */

define([
  'webdesignwill'
], function (webdesignwill) {

    "use strict";

    var PageFactory = function () {

      /* Close down the previous view
      ==================== */
      function tearDown () {
        var trash = webdesignwill.page.get('page');
        if(trash) {
          trash.close();
        }
      }

      this.make = function (pageModel, Page, identifier) {

        /* Create the page instance. Could be DefaultPage, BlogPage etc
        ======================================== */
        function produce (template) {
          var pageIdClass = pageModel.get('name') + '-page';
          var page = new Page({
            model : pageModel,
            template : template,
            id : pageIdClass,
            className : pageIdClass,
            $container : $('#site-content-body'),
            identifier : identifier || null
          });

          webdesignwill.page.set({
            page : page,
            model : pageModel
          });
        }

        tearDown();
        $.get('/js/templates/' + pageModel.get('name') + '/' + pageModel.get('name') + '.tpl', produce);
      };

    };

    webdesignwill.pageFactory = new PageFactory();

});