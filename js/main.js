
require.config({

  paths : {

    pages: '../js/pages',
    views: '../js/views',

    jquery                                  : 'libs/jquery/jquery-min',
    Backbone                             : 'libs/backbone/backbone-min',
    underscore                           : 'libs/underscore/underscore-min',
    handlebars                           : 'libs/handlebars/handlebars',
    text                                      : 'libs/require/text-min',
    domReady                            : 'libs/require/domReady',

    utils                                     : 'utils',

    // Helpers
    page                                      : 'helpers/page',

    // Collections
    NewsCollection                    : 'collections/news/NewsCollection',

    // Models
    appModel                             : 'models/app/appModel',
    sitemapModel                       : 'models/app/sitemapModel',
    PageModel                            : 'models/app/PageModel',
    NewsModel                           : 'models/news/NewsModel',

    // Views
    FooterView                            : 'views/footer/FooterView',
    FooterSocialView                   : 'views/footer/FooterSocialView',
    FooterNewsView                    : 'views/footer/FooterNewsView',
    FooterNewsItemView             : 'views/footer/FooterNewsItemView',
    FooterContactView                : 'views/footer/FooterContactView',
    HeaderView                           : 'views/header/HeaderView',
    SiteContentHeaderView         : 'views/siteContentHeader/SiteContentHeaderView',
    NavView                                : 'views/nav/NavView',
    NavSubView                          : 'views/nav/NavSubView',
    StrapView                             : 'views/strap/StrapView',
    PageControlsView                 : 'views/pageControls/PageControlsView',
    SiteLoaderView                     : 'views/siteLoader/SiteLoaderView',

    // Pages
    PageController                      : 'pages/PageController',
    HomePage                             : 'pages/home/HomePage',
    ContactPage                          : 'pages/contact/ContactPage',
    ThisPage                                : 'pages/this/ThisPage'

  },

  shim : {
    'Backbone' : {
      deps : ['jquery', 'underscore', 'handlebars'],
      exports : "Backbone"
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'PageController' : {
      deps : ['page']
    },
    'app' : {
      deps : ['sitemapModel']
    }
  }

});

require([
  'app',
  'domReady'
], function (app, domReady) {
  domReady(function() {
    app.init();
  });
});