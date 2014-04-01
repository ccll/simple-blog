/// <reference path='../../shared/models.ts' />

declare var Meteor;
declare var App;
declare var Session;
declare var Template;
declare var Deps;
declare var decodeURIComponent;
declare var _;
declare var console;
declare var Error;
declare var parseInt;
declare var UiRouter;

var PostListRouteConfig = {
  url: "/?tag&page",
  template: UiRouter.template('postList'),
  resolve: {
    postListResult: ['$postProxy', '$stateParams', function ($postProxy, $stateParams) {
      return $postProxy.getPostList($stateParams);
    }]
  },
  controller: 'PostListCtrl'
};
this.PostListRouteConfig = PostListRouteConfig;


App.controller('PostListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'postListResult',
  function ($scope, $rootScope, $state, $stateParams, postListResult) {
    _.extend($scope, postListResult);

    // Navigate to post detail page
    $scope.gotoPostDetail = function (postId:string) {
      $state.go('postDetail', {id: postId});
    };
  }
]);
