
require.config({

  paths : {

    GH_path                                            : 'packages/github/',

    git                                                     : 'packages/github/git',

    // pages
    GH_SigninPage                                  : 'packages/github/pages/signin/SigninPage'

  },

  deps : ['webdesignwill', 'git'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});