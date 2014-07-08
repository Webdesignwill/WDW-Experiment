
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

    jquery                                       : 'libs/jquery/jquery-min',
    velocity                                     : 'libs/jquery/velocity-min',
    Backbone                                  : 'libs/backbone/backbone-min',
    underscore                                : 'libs/underscore/underscore-min',
    handlebars                                : 'libs/handlebars/handlebars',
    text                                           : 'libs/require/text-min',
    domReady                                 : 'libs/require/domReady',

    // Utilities
    $topics                                       : 'utilities/topics',
    launchControl                            : 'utilities/launchControl',

    // Extensions
    page                                           : 'extensions/page',

    // Managers
    PackageManager                         : 'packages/PackageManager',
    PageFactory                                : 'pages/PageFactory',
    Router                                          : 'Router',

    // Application Models
    webdesignwill                            : 'webdesignwill',
    Sitemap                                      : 'models/app/Sitemap',
    PageModel                                  : 'models/page/PageModel',
    UserModel                                  : 'models/user/UserModel',
    LoginModel                                : 'models/auth/LoginModel',
    RegisterModel                            : 'models/auth/RegisterModel',

    // Admin Views
    AdminBarView                            : 'admin/views/adminBar/AdminBarView',

    // Theme Views
    BodyView                                    : 'views/BodyView',
    ModalView                                  : 'views/modal/ModalView',
    FooterView                                 : 'views/footer/FooterView',
    FooterSocialView                        : 'views/footer/FooterSocialView',
    FooterNewsView                         : 'views/footer/FooterNewsView',
    FooterNewsItemView                  : 'views/footer/FooterNewsItemView',
    FooterContactView                     : 'views/footer/FooterContactView',
    HeaderView                                : 'views/header/HeaderView',
    SiteContentHeaderView              : 'views/siteContentHeader/SiteContentHeaderView',
    NavView                                     : 'views/nav/NavView',
    NavUserView                              : 'views/nav/NavUserView',
    NavSubView                               : 'views/nav/NavSubView',
    PageControlsView                      : 'views/pageControls/PageControlsView',

    // Pages
    DefaultPage                               : 'pages/default/DefaultPage',

    // Auth views
    login                                          : 'views/auth/LoginView',
    register                                      : 'views/auth/RegisterView'

  },
  shim : {
    'Backbone' : {
      deps : ['jquery', 'underscore', 'handlebars'],
      exports : "Backbone"
    },
    'handlebars' : {
      exports: 'Handlebars'
    },
    'velocity' : {
      deps : ['jquery']
    }
  },
  deps : ['jquery', 'velocity', 'webdesignwill', 'domReady', 'page', 'PackageManager'],
  callback : function ($, velocity, webdesignwill, domReady) {
    domReady(function() {
      webdesignwill.init();
    });
  }
});