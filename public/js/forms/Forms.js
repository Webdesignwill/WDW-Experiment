
define(['require'], function (require) {

  "use strict";

  var Forms = function () {
    this.make = function (options) {
      var $dfd = new $.Deferred();

      require([options.name + 'Form'], function (Form) {
        var form = new Form({
          el : options.el
        });

        $.when(form.askForPromise()).then(function (model) {
          $dfd.resolve(model);
        });

      });

      return $dfd.promise();
    };
  };

  return new Forms();

});