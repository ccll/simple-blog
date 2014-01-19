/// <reference path='../../shared/models.ts' />

declare var Meteor;
declare var ngMeteor;
declare var Session;
declare var Date;
declare var Deps;
declare var decodeURIComponent;
declare var _;
declare var console;
declare var Error;

ngMeteor.controller('PostListCtrl', ['$scope', '$state', '$stateParams', 'data',
    function ($scope, $state, $stateParams, data) {

        if (data.err) {
            $scope.err = data.err;
        } else {
            $scope.tag = data.tag;
            $scope.page = data.page;
            $scope.post_list = data.post_list;
        }

        // Format post date to human readable string.
        $scope.format_date = function(ms:number):string {
            return new Date(ms).toLocaleString();
        };

    }
]);
