declare var ngMeteor;
declare var _;
declare var marked;
declare var console;

ngMeteor.controller('PostEditorCtrl', ['$scope', 'data',
    function($scope, data) {
        _.extend($scope, data);

        $scope.on_key_down = function(ev) {
            // TAB to indent.
            if (ev.which === 9) {
                ev.preventDefault();
            }
        }
    }
]);
