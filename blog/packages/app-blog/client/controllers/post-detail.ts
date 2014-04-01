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
