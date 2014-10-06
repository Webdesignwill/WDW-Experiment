
/*

  So each form object would have it's own model. This model is going to validate etc. Once the model is valid,
  the data is sent.

  Once it's validated and the request is sent and received, then update the passed model ie : userModel
  with the results of the returned data.

  Store the views here as opposed to having a views folder for login, register etc.
  Render the template where it's required to be rendered and then validate according to the
  page model in models/loginModel etc

*/

define(['require'], function (require) {

  "use strict";

  var FormsManager = function () {
    this.make = function (options) {
      require([options.name + 'Form'], function (Form) {
        new Form({
          el : options.el
        });
      });
    };
  };

  return new FormsManager();

});