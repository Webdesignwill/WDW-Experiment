
/* Package manager is here to load packages associated with a page. The package names are in
    an array stored on the page model. The Package manager loads the packages and attaches
    them to the package object for use. Comms between packages is pubsub via the
    packages.$events object.
========================================================== */

define([
  'Backbone',
  'webdesignwill'
], function (Backbone, webdesignwill) {

  "use strict";

  var PackageManager = function() {

    this.$events = _.clone(Backbone.Events);
    var packages = {},
          interests = {
            loaded : function (data) {},
            initialised : function (data) {},
            started : function (data) {},
            stopped : function (data) {}
          };

    /* LoadCommonJsPackages requires each package associated with the current page.
        * Get the common JS module for the package incrementing the counter each time.
        * Require the package and attach the require object to the package object with its unique key
        * Create a deferred and pass the package a callback that resolves the deferred.
        * Wait for the package to be initialised or fail before moving to the next one.
    ========================================================== */
    function loadCommonJsPackages (pgsArray) {

      var counter, packageName;

      function initPackage () {

        /* Either grab the element where the package should be loaded in to
            or pass the whole page container
        ========================================== */
        var $page = webdesignwill.page.get('page'),
              $packageElement = $page.$el.find("[data-package='" + packageName + "']");

        var options = {
          $el : $packageElement.length > 0 ? $packageElement : $page.$el,
          callback : next
        };

        packages[packageName].req(['app'], function (app) {
          app.init(options, next);
        });
      }

      /* Store a reference to the package on the packages object
          then create the require object
      ======================================== */
      function loadPackage (config) {
        if(packages[packageName] === undefined) {
          packages[packageName] = {
            req : require(config, function () {
              initPackage();
            })
          };
        } else {
          next();
        }
      }

      // Get the commonjs module
      function requireConfig () {

        /* Dependency Injection
            Here you can modify or inject properties to the new packages require config
        ================================================= */
        function injectDependencies (config) {
          config = config(packageName);
          config.paths.Backbone = '../../libs/backbone/backbone-min';
          return config;
        }

        base_require([packageName], function (config) {
          loadPackage(injectDependencies(config));
        });
      }

      function next () {
        counter = counter === undefined ? 0 : counter += 1;
        packageName = pgsArray[counter];
        if(packageName !== undefined) {
          requireConfig();
        } else {
          console.log('All packages loaded');
        }
      }

      next();

    }

    /* Listen to the page change and load packages in the packages array on the package model.
        pageModel.get('packages') returns an array. Could be empty but always an array. If it's more
        than 0 then start loading them.
    ========================================================== */
    webdesignwill.page.on('change:page', function (model) {
      var pageModel = model.get('page').model,
            pgsArray = pageModel.get('packages');

      if(pgsArray.length > 0) {
        loadCommonJsPackages(pgsArray);
      }

    }, this);

  };

  webdesignwill.packageManager = new PackageManager();

});