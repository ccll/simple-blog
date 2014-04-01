declare var console;
declare var Meteor;
declare var App;
declare var Template;
declare var decodeURIComponent;
declare var Random;
declare var PostListRouteConfig;
declare var PostDetailRouteConfig;
declare var PostEditorRouteConfig;
declare var CmsRouteConfig;
declare var CmsPostDetailRouteConfig;
declare var UiRouter;

App.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('postList', PostListRouteConfig);
    $stateProvider.state('postDetail', PostDetailRouteConfig);
    $stateProvider.state('postEditor', PostEditorRouteConfig);

    $stateProvider.state('login', {url: "/login", controller: 'LoginCtrl'});
    $stateProvider.state('cms', CmsRouteConfig);
    $stateProvider.state('cms.postDetail', CmsPostDetailRouteConfig);
  }
]);
