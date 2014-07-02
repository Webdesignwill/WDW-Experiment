
/* The Factory is called when a page instance needs to be made up
    It also triggers the global page change event.

    It requires the module for instance webdesignwill, github, package etc
    This is because the package saves the state on it's page property.
    ======================================== */

define([], function () {

    "use strict";

    var PageFactory = function (module) {

      function closeCurrentPage (done) {
        var $dfd = new $.Deferred(),
              page = module.page.get('page');

        if(page && typeof page.after === 'function') {
          $.when($dfd.promise(page.after($dfd))).then(function () {
            tearDown();
            done();
          });
        } else {
          done();
        }
      }

      function openNextPage ($container, page, done) {

        var $dfd = new $.Deferred();

        if(typeof page.before === 'function') {
          $.when($dfd.promise(page.before($container, $dfd))).then(function () {
            done();
          });
        } else {
          done();
        }
      }

      /* Close down the previous view associated with the module that contains it ie Github etc
      ======================================================= */
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

          openNextPage($container, page, function () {
            module.page.set({
              page : page,
              model : pageModel
            });
          });
        }

        closeCurrentPage(function () {
          $.get(templatePath + '/' + pageModel.get('name') + '.tpl', produce);
        });

      };

    };

    return PageFactory;

});