/// <reference path='../../shared/models.ts' />

declare var ngMeteor;
declare var Meteor;
declare var _;

ngMeteor.factory('post', ['$q', '$rootScope',
    function($q, $rootScope) {
        return {
            get: function(post_id: string):Post {
                var defer = $q.defer();
                Meteor.call('post', post_id, function(err, post) {
                    $rootScope.safeApply(function() {
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

ngMeteor.controller('PostDetailCtrl', ['$scope', 'data',
    function($scope, data) {
        _.extend($scope, data);
    }
]);
