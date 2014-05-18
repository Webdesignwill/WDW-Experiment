
require.config({

  baseUrl : '/js/',

  packages: [{
    name : 'github',
    location : 'themes/packages/github'
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
    FooterView                            : 'themes/views/footer/FooterView',
    FooterSocialView                   : 'themes/views/footer/FooterSocialView',
    FooterNewsView                    : 'themes/views/footer/FooterNewsView',
    FooterNewsItemView             : 'themes/views/footer/FooterNewsItemView',
    FooterContactView                : 'themes/views/footer/FooterContactView',
    HeaderView                           : 'themes/views/header/HeaderView',
    SiteContentHeaderView         : 'themes/views/siteContentHeader/SiteContentHeaderView',
    NavView                                : 'themes/views/nav/NavView',
    NavUserView                         : 'themes/views/nav/NavUserView',
    NavSubView                          : 'themes/views/nav/NavSubView',
    PageControlsView                 : 'themes/views/pageControls/PageControlsView',
    SiteLoaderView                     : 'themes/views/siteLoader/SiteLoaderView',

    // Admin Pages
    AdminPage                            : 'admin/pages/admin/AdminPage',

    // Theme pages
    HomePage                             : 'themes/pages/home/HomePage',
    ContactPage                          : 'themes/pages/contact/ContactPage',
    PacksPage                              : 'themes/pages/packs/PacksPage'

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