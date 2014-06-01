
require.config({

  paths : {

    'github-path'                                      : 'packages/github/',

    'git'                                                      : 'packages/github/git',

    // models
    'github-Sitemap'                                 : 'packages/github/models/app/Sitemap',
    'github-UserModel'                             : 'packages/github/models/user/UserModel',

    // pages
    'github-SigninPage'                            : 'packages/github/pages/signin/SigninPage',
    'github-RepositoriesPage'                   : 'packages/github/pages/repositories/RepositoriesPage',

    // views
    'github-RepositoryItemView'              : 'packages/github/views/repositories/RepositoryItemView',
    'github-SelectUserFormView'              : 'packages/github/views/selectUser/SelectUserFormView',
    'github-SelectUserListView'                : 'packages/github/views/selectUser/SelectUserListView',
    'github-SelectUserListItemView'         : 'packages/github/views/selectUser/SelectUserListItemView'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill, git) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});