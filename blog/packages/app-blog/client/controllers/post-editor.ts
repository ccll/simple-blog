declare var App;
declare var Meteor;
declare var _;
declare var marked;
declare var console;
declare var navigator;
declare var Random;
declare var UiRouter;

var PostEditorRouteConfig = {
  url: "/edit/:id",
  template: UiRouter.template('postEditor'),
  resolve: {
    data: ['post', '$stateParams', function (post, $stateParams) {
      if ($stateParams.id) {
        // Read post from server.
        return post.get($stateParams.id);
      } else {
        // Generate a empty post with a new random id.
        $stateParams.id = Random.id();
        return {post: {_id: $stateParams.id}};
      }
    }]
  },
  controller: 'PostEditorCtrl'
};
this.PostEditorRouteConfig = PostEditorRouteConfig;


App.controller('PostEditorCtrl', ['$scope', '$stateParams', 'data',
  function ($scope, $stateParams, data) {

    // Import all data.
    _.extend($scope, data);

    $scope.on_key_down = function (ev) {

      if (ev.which === 9) {
        // TAB to indent.
        ev.preventDefault();
        // TODO: insert a TAB at current caret.

      } else if (ev.which === 83) {
        // meta+s / ctrl+s
        if (($scope.os === 'windows' && ev.ctrlKey)
            || ($scope.os === 'macos' && ev.metaKey)) {
          ev.preventDefault();

          Meteor.call('save_draft', $stateParams.id, $scope.post.content,
              function (err, result) {
              }
          );
        }
      }
    }
  }
]);
