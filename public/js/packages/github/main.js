define(function (require, exports, module) {
  module.exports = function (name) {
    return {
      baseUrl                                        : '/js/packages/' + name,
      context                                        : name + '_require',
      paths : {

        text                                           : '../../libs/require/text-min',
        handlebars                                : '../../libs/handlebars/handlebars',

        app                                           : 'app',
        router                                        : 'router',
        PostsPage                                  : 'pages/posts/PostsPage',

        // models
        Sitemap                                     : 'models/app/Sitemap',
        userModel                                 : 'models/user/userModel',

        // pages
        SigninPage                                 : 'pages/signin/SigninPage',
        RepositoriesPage                       : 'pages/repositories/RepositoriesPage',
        RepositoryPage                          : 'pages/repositories/RepositoryPage',

        // views
        BodyView                                   : 'views/BodyView',
        HeaderView                               : 'views/header/HeaderView',
        RepositoryItemView                   : 'views/repositories/RepositoryItemView',
        SelectUserFormView                  : 'views/selectUser/SelectUserFormView',
        SelectUserListView                      : 'views/selectUser/SelectUserListView',
        SelectUserListItemView              : 'views/selectUser/SelectUserListItemView'
      },
      shim : {
        'handlebars': {
          exports: 'Handlebars'
        }
      },
      deps : ['app', 'router'],
      callback : function (app, router) {

      }
    };
  };
});