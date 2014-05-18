
require.config({

  paths : {

    'github-path'                                      : 'themes/packages/github/',

    git                                                       : 'themes/packages/github/git',

    // models
    'github-Sitemap'                                 : 'themes/packages/github/models/app/Sitemap',
    'github-UserModel'                             : 'themes/packages/github/models/user/UserModel',

    // pages
    'github-SigninPage'                            : 'themes/packages/github/pages/signin/SigninPage',
    'github-RepositoriesPage'                   : 'themes/packages/github/pages/repositories/RepositoriesPage',

    // views
    'github-RepositoryItemView'              : 'themes/packages/github/views/repositories/RepositoryItemView',
    'github-SelectUserFormView'              : 'themes/packages/github/views/selectUser/SelectUserFormView',
    'github-SelectUserListView'                : 'themes/packages/github/views/selectUser/SelectUserListView',
    'github-SelectUserListItemView'         : 'themes/packages/github/views/selectUser/SelectUserListItemView'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});