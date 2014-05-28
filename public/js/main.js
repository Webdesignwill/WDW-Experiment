
require.config({

  baseUrl : '/js/',

  packages: [{
    name : 'github',
    location : 'packages/github'
  }],

  paths : {

    jquery                                  : 'core/libs/jquery/jquery-min',
    Backbone                             : 'core/libs/backbone/backbone-min',
    underscore                           : 'core/libs/underscore/underscore-min',
    handlebars                           : 'core/libs/handlebars/handlebars',
    text                                      : 'core/libs/require/text-min',
    domReady                            : 'core/libs/require/domReady',

    // Extensions
    page                                      : 'core/extensions/page',
    package                                 : 'core/extensions/package',

    // Managers
    PackageManager                    : 'core/managers/PackageManager',
    PageManager                          : 'core/managers/PageManager',

    // Application Models
    webdesignwill                       : 'webdesignwill',
    Sitemap                                 : 'core/models/app/Sitemap',
    PageModel                            : 'core/models/page/PageModel',
    UserModel                            : 'core/models/user/UserModel',

    // Admin Views
    AdminBarView                       : 'admin/views/adminBar/AdminBarView',

    // Theme Views
    FooterView                            : 'views/footer/FooterView',
    FooterSocialView                   : 'views/footer/FooterSocialView',
    FooterNewsView                    : 'views/footer/FooterNewsView',
    FooterNewsItemView             : 'views/footer/FooterNewsItemView',
    FooterContactView                : 'views/footer/FooterContactView',
    HeaderView                           : 'views/header/HeaderView',
    SiteContentHeaderView         : 'views/siteContentHeader/SiteContentHeaderView',
    NavView                                : 'views/nav/NavView',
    NavUserView                         : 'views/nav/NavUserView',
    NavSubView                          : 'views/nav/NavSubView',
    PageControlsView                 : 'views/pageControls/PageControlsView',
    SiteLoaderView                     : 'views/siteLoader/SiteLoaderView',

    // Admin Pages
    AdminHome                           : 'admin/pages/home/AdminHome',
    EditPage                                  : 'admin/pages/edit/EditPage',
    CreatePage                              : 'admin/pages/create/CreatePage',
    UserPage                                : 'admin/pages/user/UserPage',
    LoginPage                              : 'admin/pages/user/LoginPage',
    RegisterPage                           : 'admin/pages/user/RegisterPage',

    // Theme pages
    HomePage                             : 'pages/home/HomePage',
    ContactPage                          : 'pages/contact/ContactPage',
    PacksPage                              : 'pages/packs/PacksPage'

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