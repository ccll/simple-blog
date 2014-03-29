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

App.factory('$postList', ['$q', '$rootScope',
    function($q, $rootScope) {
        return {
            get: function(stateParams) {
                var tag = stateParams.tag ? decodeURIComponent(stateParams.tag) : '';
                var page = parseInt(stateParams.page) || 1;

                var defer = $q.defer();
                Meteor.call('get_post_list', tag, page, function(err, post_list) {
                    $rootScope.$apply(function() {
                        if (err) {
                            defer.resolve({err: err});
                        } else {
                            defer.resolve({tag: tag, page: page, post_list: post_list});
                        }
                    });
                });
                return defer.promise;
            }
        }
    }
]);

var PostListRouteConfig = {
    url: "/?tag&page",
    template: UiRouter.template('postList'),
    resolve: {
        data: ['$postList', '$stateParams', function ($postList, $stateParams) {
            return $postList.get($stateParams);
        }]
    },
    controller: 'PostListCtrl'
};
this.PostListRouteConfig = PostListRouteConfig;


App.controller('PostListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'data',
    function ($scope, $rootScope, $state, $stateParams, data) {

        _.extend($scope, data);

        $scope.gotoPostDetail = function(post_id:string) {
            $state.go('post-detail', {id:post_id});
        };

    }
]);
