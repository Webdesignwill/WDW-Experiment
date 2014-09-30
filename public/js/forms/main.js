define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                        : '/js/forms',
      context                                        : 'siteify_forms',
      paths : {
        FormsManager                            : 'FormsManager',

        // Forms
        loginForm                                    : 'login/loginForm'
      },
      deps : ['FormsManager']
    };
  };
});