
require.config({

  paths : {

    'github-path'                                      : 'packages/github/',

    git                                                       : 'packages/github/git',

    // Models
    'github-Sitemap'                                 : 'packages/github/models/app/Sitemap',

    // pages
    'github-SigninPage'                            : 'packages/github/pages/signin/SigninPage',
    'github-RepositoriesPage'                   : 'packages/github/pages/repositories/RepositoriesPage'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});