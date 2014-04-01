/// <reference path='../../shared/models.ts' />
declare var App;
declare var parseInt;
declare var decodeURIComponent;

App.factory('$postProxy', ['$q', '$rootScope',
  function ($q, $rootScope) {
    return {
      getPostList: function (stateParams) {
        var tag = stateParams.tag ? decodeURIComponent(stateParams.tag) : '';
        var page = parseInt(stateParams.page) || 1;

        var defer = $q.defer();
        Meteor.call('getPostList', tag, page, function (err, postList) {
          $rootScope.$apply(function () {
            if (err) {
              defer.resolve({err: err});
            } else {
              defer.resolve(<PostListResult> {tag: tag, page: page, postList: postList});
            }
          });
        });
        return defer.promise;
      },

      getAllPostList: function (stateParams) {
        var tag = stateParams.tag ? decodeURIComponent(stateParams.tag) : '';

        var defer = $q.defer();
        Meteor.call('getAllPostList', tag, function (err, postList) {
          $rootScope.$apply(function () {
            if (err) {
              defer.resolve({err: err});
            } else {
              defer.resolve(<PostListResult> {tag: tag, postList: postList});
            }
          });
        });
        return defer.promise;
      },

      getPostDetail: function (postId:string):Post {
        var defer = $q.defer();
        Meteor.call('getPost', postId, function (err, post) {
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
