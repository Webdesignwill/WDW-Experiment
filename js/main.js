
require.config({

  baseUrl : '/js/',

  packages: [{
    name : 'github',
    location : 'packages/github'
  }],

  paths : {

    jquery                                  : 'libs/jquery/jquery-min',
    Backbone                             : 'libs/backbone/backbone-min',
    underscore                           : 'libs/underscore/underscore-min',
    handlebars                           : 'libs/handlebars/handlebars',
    text                                      : 'libs/require/text-min',
    domReady                            : 'libs/require/domReady',

    utils                                      : 'utils',

    // Extensions
    page                                      : 'extensions/page',

    // Controllers n Managers
    PackageManager                    : 'packages/PackageManager',
    PageController                       : 'pages/PageController',

    // Application Models
    webdesignwill                       : 'webdesignwill',
    Sitemap                                 : 'models/app/Sitemap',
    PageModel                            : 'models/page/PageModel',

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
    }
  },
  deps : ['webdesignwill', 'domReady', 'Sitemap', 'PackageManager', 'page', 'router'],
  callback : function (webdesignwill, domReady) {
    domReady(function() {
      webdesignwill.initWebdesignwill();
    });
  }
});