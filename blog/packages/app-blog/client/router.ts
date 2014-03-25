declare var console;
declare var Meteor;
declare var App;
declare var Template;
declare var decodeURIComponent;
declare var Random;
declare var PostListRouteConfig;
declare var PostDetailRouteConfig;

App.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");
    $stateProvider.state('post-list', PostListRouteConfig);
    $stateProvider.state('post-detail', PostDetailRouteConfig);

    $stateProvider.state('login', {
      url: "/login",
      template: Template['login'],
      controller: 'LoginCtrl'
    });

    $stateProvider.state('post-editor', {
      url: "/edit/:id",
      template: Template['post-editor'],
      resolve: {
        data: ['post', '$stateParams', function (post, $stateParams) {
          if ($stateParams.id) {
            // Read post from server.
            return post.get($stateParams.id);
          } else {
            // Generate a empty post with a new random id.
            $stateParams.id = Random.id();
            return {post:{_id: $stateParams.id}};
          }
        }]
      },
      controller: 'PostEditorCtrl'
    });
  }
]);
