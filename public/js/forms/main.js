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
        LoginForm                                    : 'login/LoginForm',
        LoginModel                                  : 'login/models/LoginModel',
        ProfileForm                                  : 'profile/ProfileForm',
        ProfileModel                                 : 'profile/models/ProfileModel',
        RegisterForm                                : 'register/RegisterForm',
        RegisterModel                               : 'register/models/RegisterModel'
      }
    };
  };
});