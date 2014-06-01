
require.config({

  paths : {

    'talk-path'                                           : 'packages/talk/',

    'talk'                                                    : 'packages/talk/talk',

    // models
    'talk-Sitemap'                                      : 'packages/talk/models/app/Sitemap'

  },

  deps : ['webdesignwill', 'talk'],

  callback : function (webdesignwill) {
    webdesignwill.packageManager.$events.trigger('talk:loaded', {
      type : 'loaded',
      pack : 'talk'
    });
  }

});