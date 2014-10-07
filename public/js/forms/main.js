define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                         : '/js/forms',
      context                                         : 'siteify_forms',
      paths : {

        text                                             : '../libs/require/text-min',
        handlebars                                  : '../libs/handlebars/handlebars',

        Forms                                          : 'Forms',

        // Forms
        loginForm                                    : 'login/loginForm'
      },
      deps : ['Forms']
    };
  };
});