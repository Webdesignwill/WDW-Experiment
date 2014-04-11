
require.config({

  paths : {

    gh_path                                           : 'packages/github/',

    Github                                              : 'packages/github/Github',

    // pages
    gh_SigninPage                                  : 'packages/github/pages/signIn/SigninPage'

  },

  deps : ['webdesignwill', 'Github'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$bus.trigger('github:loaded', {
      type : 'loaded',
      pack : 'github'
    });
  }

});