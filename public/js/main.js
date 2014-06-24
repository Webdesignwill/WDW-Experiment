
var base_require = require.config({

  baseUrl : '/js/',
  context : 'base_require',

  packages: [{
    name : 'github',
    location : 'packages/github'
  },{
    name : 'talk',
    location : 'packages/talk'
  },{
    name : 'twitch',
    location : 'packages/twitch'
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

    // Managers
    PackageManager                    : 'packages/PackageManager',
    PageManager                          : 'pages/PageManager',

    // Application Models
    webdesignwill                       : 'webdesignwill',
    Sitemap                                 : 'models/app/Sitemap',
    PageModel                            : 'models/page/PageModel',
    UserModel                            : 'models/user/UserModel',

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
    SiteLoaderView                      : 'views/siteLoader/SiteLoaderView',

    // Pages
    DefaultPage                            : 'pages/default/DefaultPage'

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
      webdesignwill.init();
    });
  }
});