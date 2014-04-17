
require.config({

  paths : {

    gh_path                                            : 'packages/github/',

    git                                                    : 'packages/github/git',

    // pages
    gh_SigninPage                                  : 'packages/github/pages/signin/SigninPage'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});