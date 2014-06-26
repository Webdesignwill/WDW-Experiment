define(function (require, exports, module) {
  module.exports = function (name) {
    return {
      baseUrl                                        : '/js/packages/' + name,
      context                                        : name + '_require',
      paths : {

        app                                           : 'app',
        PostsPage                                  : 'pages/posts/PostsPage',

        // models
        Sitemap                                     : 'models/app/Sitemap',
        userModel                                 : 'models/user/userModel',

        // pages
        SigninPage                                 : 'pages/signin/SigninPage',
        RepositoriesPage                       : 'pages/repositories/RepositoriesPage',

        // views
        RepositoryItemView                   : 'views/repositories/RepositoryItemView',
        SelectUserFormView                  : 'views/selectUser/SelectUserFormView',
        SelectUserListView                      : 'views/selectUser/SelectUserListView',
        SelectUserListItemView              : 'views/selectUser/SelectUserListItemView'
      }
    };
  };
});