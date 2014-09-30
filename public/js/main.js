
var base_require = require.config({

  baseUrl : '/js/',
  context : 'base_require',

  /* Abstract these to the packages main file */
  packages: [{
    name : 'github',
    location : 'packages/github'
  },{
    name : 'talk',
    location : 'packages/talk'
  },{
    name : 'twitch',
    location : 'packages/twitch'
  },{
    name : 'forms',
    location : 'forms'
  }],

  paths : {

    jquery                                       : 'libs/jquery/jquery-min',
    velocity                                     : 'libs/jquery/velocity-min',
    Backbone                                  : 'libs/backbone/backbone-min',
    Validation                                 : 'libs/backbone/backbone-validation-min',
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
    PackageManager                          : 'packages/PackageManager',
    PageFactory                                 : 'pages/PageFactory',
    Router                                          : 'Router',

    // Application Models
    webdesignwill                            : 'webdesignwill',
    Sitemap                                      : 'models/app/Sitemap',
    PageModel                                  : 'models/page/PageModel',
    UserModel                                  : 'models/user/UserModel',
    oauth2Model                              : 'models/oauth/Oauth2Model',

    // Admin Views
    AdminBarView                            : 'views/admin/AdminBarView',

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
    login                                          : 'views/user/LoginView',
    register                                      : 'views/user/RegisterView',
    profile                                        : 'views/user/ProfileView'

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
  deps : ['jquery', 'velocity', 'webdesignwill', 'domReady', 'page', 'PackageManager', 'Validation'],
  callback : function ($, velocity, webdesignwill, domReady) {
    domReady(function() {
      webdesignwill.init();
    });
  }
});