/// <reference path='../../shared/models.ts' />

declare var App;
declare var Meteor;
declare var Template;
declare var _;
declare var marked;
declare var UiRouter;

App.directive('markdown', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.markdown) {
        scope.$watch(attrs.markdown, function (newVal) {
          var html = newVal ? marked(newVal) : '';
          element.html(html);
        });
      } else {
        var html = marked(element.text());
        element.html(html);
      }
    }
  };
});

App.factory('$postDetail', ['$q', '$rootScope',
  function ($q, $rootScope) {
    return {
      get: function (post_id:string):Post {
        var defer = $q.defer();
        Meteor.call('get_post', post_id, function (err, post) {
          $rootScope.safeApply(function () {
            if (err) {
              defer.resolve({err: err});
            } else {
              defer.resolve({post: post});
            }
          });
        });
        return defer.promise;
      }
    }
  }
]);

var PostDetailRouteConfig = {
  url: "/post/:id",
  template: UiRouter.template('post-detail'),
  resolve: {
    data: ['$postDetail', '$stateParams', function ($postDetail, $stateParams) {
      return $postDetail.get($stateParams.id);
    }]
  },
  controller: 'PostDetailCtrl'
};
this.PostDetailRouteConfig = PostDetailRouteConfig;


App.controller('PostDetailCtrl', ['$scope', 'data',
  function ($scope, data) {
    _.extend($scope, data);
  }
]);
