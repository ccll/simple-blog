/// <reference path='../../shared/models.ts' />

declare var Meteor;
declare var ngMeteor;
declare var Session;
declare var Date;
declare var Deps;
declare var decodeURIComponent;
declare var _;
declare var console;

ngMeteor.controller('PostListCtrl', ['$scope', '$state', '$stateParams', '$collection',
    function ($scope, $state, $stateParams, $collection) {

        // Query post list.
        $scope.loading_posts = true;
        $scope.tag = decodeURIComponent($stateParams.tag) || '';
        $scope.page = $stateParams.page || 1;
        Meteor.call('post_list', $scope.tag, $scope.page, function(err, post_list) {
            $scope.safeApply(function() {
                $scope.loading_posts = false;

                if (err) {
                    $scope.err = err;
                    return;
                }

                $scope.post_list = post_list;
            });
        });

        // Format post date to human readable string.
        $scope.format_date = function(ms:number):string {
            return new Date(ms).toLocaleString();
        };

    }
]);
