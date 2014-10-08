define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                         : '/js/forms',
      context                                         : 'siteify_forms',
      paths : {

        Backbone                                    : '../libs/backbone/backbone-min',
        text                                             : '../libs/require/text-min',
        handlebars                                  : '../libs/handlebars/handlebars',

        Forms                                          : 'Forms',

        // Forms
        loginForm                                    : 'login/loginForm',
        LoginModel                                  : 'login/models/LoginModel'
      }
    };
  };
});