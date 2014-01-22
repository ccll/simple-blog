/// <reference path='../../shared/models.ts' />

declare var Meteor;
declare var ngMeteor;
declare var Session;
declare var Deps;
declare var decodeURIComponent;
declare var _;
declare var console;
declare var Error;
declare var parseInt;

ngMeteor.factory('post_list', ['$q', '$rootScope',
    function($q, $rootScope) {
        return {
            get: function(stateParams) {
                var tag = stateParams.tag ? decodeURIComponent(stateParams.tag) : '';
                var page = parseInt(stateParams.page) || 1;

                var defer = $q.defer();
                Meteor.call('post_list', tag, page, function(err, post_list) {
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


ngMeteor.controller('PostListCtrl', ['$scope', '$state', '$stateParams', 'data',
    function ($scope, $state, $stateParams, data) {

        _.extend($scope, data);

    }
]);
