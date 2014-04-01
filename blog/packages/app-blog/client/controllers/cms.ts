declare var App;
declare var UiRouter;
declare var _;
declare var PostListResult;
declare var console;

var CmsRouteConfig = {
  url: "/cms?tag",
  template: UiRouter.template('cms'),
  resolve: {
    postListResult: ['$postProxy', '$stateParams', function ($postProxy, $stateParams) {
      return $postProxy.getAllPostList($stateParams);
    }]
  },
  controller: 'CmsCtrl'
};
this.CmsRouteConfig = CmsRouteConfig;

App.controller('CmsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'postListResult',
  function ($scope, $rootScope, $state, $stateParams, postListResult) {
    _.extend($scope, postListResult);

    $scope.gotoCmsPostDetail = function (postId: string) {
      $state.go('cms.postDetail', {id: postId});
    };
  }
]);


var CmsPostDetailRouteConfig = {
  url: "/post/:id",
  template: UiRouter.template('cmsPostDetail'),
  resolve: {
    postDetailResult: ['$postProxy', '$stateParams', function ($postProxy, $stateParams) {
      return $postProxy.getPostDetail($stateParams.id);
    }]
  },
  controller: 'CmsPostDetailCtrl'
};
this.CmsPostDetailRouteConfig = CmsPostDetailRouteConfig;

App.controller('CmsPostDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'postDetailResult',
  function ($scope, $rootScope, $state, $stateParams, postDetailResult) {
    $scope.post = postDetailResult.post;
  }
]);
