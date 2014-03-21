/// <reference path='../../shared/models.ts' />

declare var Meteor;
declare var App;
declare var Session;
declare var Deps;
declare var decodeURIComponent;
declare var _;
declare var console;
declare var Error;
declare var parseInt;

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


App.controller('PostListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'data',
    function ($scope, $rootScope, $state, $stateParams, data) {

        _.extend($scope, data);

    }
]);
