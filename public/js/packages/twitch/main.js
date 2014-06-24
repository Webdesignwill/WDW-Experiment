define(function (require, exports, module) {
  module.exports = function (name) {
    return {
      baseUrl                                        : '/js/packages/' + name,
      context                                        : name,
      paths : {
        app                                           : 'app',
        PostsPage                                  : 'pages/posts/PostsPage'
      }
    };
  };
});