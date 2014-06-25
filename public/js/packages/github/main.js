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
        UserModel                                 : 'models/user/UserModel',

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

// require.config({

//   paths : {

//     'github-path'                                      : 'packages/github/',

//     'git'                                                      : 'packages/github/git',

//     // models
//     'github-Sitemap'                                 : 'packages/github/models/app/Sitemap',
//     'github-UserModel'                             : 'packages/github/models/user/UserModel',

//     // pages
//     'github-SigninPage'                            : 'packages/github/pages/signin/SigninPage',
//     'github-RepositoriesPage'                   : 'packages/github/pages/repositories/RepositoriesPage',

//     // views
//     'github-RepositoryItemView'              : 'packages/github/views/repositories/RepositoryItemView',
//     'github-SelectUserFormView'              : 'packages/github/views/selectUser/SelectUserFormView',
//     'github-SelectUserListView'                : 'packages/github/views/selectUser/SelectUserListView',
//     'github-SelectUserListItemView'         : 'packages/github/views/selectUser/SelectUserListItemView'

//   },

//   deps : ['webdesignwill', 'git'],

//   callback : function (webdesignwill, git) {
//     webdesignwill.packageManager.$events.trigger('github:loaded', {
//       type : 'loaded',
//       pack : 'github'
//     });
//   }

// });