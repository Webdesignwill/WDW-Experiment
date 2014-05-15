
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

    // Extensions
    page                                      : 'extensions/page',
    package                                 : 'extensions/package',

    // Managers
    PackageManager                    : 'packages/PackageManager',
    PageManager                          : 'pages/PageManager',

    // Application Models
    webdesignwill                       : 'webdesignwill',
    Sitemap                                 : 'models/app/Sitemap',
    PageModel                            : 'models/page/PageModel',
    UserModel                            : 'models/user/UserModel',

    // Admin Views
    AdminBarView                       : 'views/admin/adminBar/AdminBarView',

    // Theme Views
    FooterView                            : 'views/theme/footer/FooterView',
    FooterSocialView                   : 'views/theme/footer/FooterSocialView',
    FooterNewsView                    : 'views/theme/footer/FooterNewsView',
    FooterNewsItemView             : 'views/theme/footer/FooterNewsItemView',
    FooterContactView                : 'views/theme/footer/FooterContactView',
    HeaderView                           : 'views/theme/header/HeaderView',
    SiteContentHeaderView         : 'views/theme/siteContentHeader/SiteContentHeaderView',
    NavView                                : 'views/theme/nav/NavView',
    NavUserView                         : 'views/theme/nav/NavUserView',
    NavSubView                          : 'views/theme/nav/NavSubView',
    PageControlsView                 : 'views/theme/pageControls/PageControlsView',
    SiteLoaderView                     : 'views/theme/siteLoader/SiteLoaderView',

    // Admin Pages
    AdminPage                            : 'pages/admin/admin/AdminPage',

    // Theme pages
    HomePage                             : 'pages/theme/home/HomePage',
    ContactPage                          : 'pages/theme/contact/ContactPage',
    PacksPage                              : 'pages/theme/packs/PacksPage'

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
  deps : ['webdesignwill', 'domReady', 'Sitemap', 'PackageManager', 'page', 'package', 'router'],
  callback : function (webdesignwill, domReady) {
    domReady(function() {
      webdesignwill.initWebdesignwill();
    });
  }
});