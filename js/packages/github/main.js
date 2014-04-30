
require.config({

  paths : {

    'github-path'                                      : 'packages/github/',

    git                                                       : 'packages/github/git',

    // Models
    'github-Sitemap'                                 : 'packages/github/models/app/Sitemap',

    // Collections
    'github-Repositories'                          : 'packages/github/collections/Repositories',

    // pages
    'github-SigninPage'                            : 'packages/github/pages/signin/SigninPage'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});