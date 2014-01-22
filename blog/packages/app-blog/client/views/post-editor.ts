declare var ngMeteor;
declare var _;
declare var marked;
declare var console;
declare var navigator;

ngMeteor.controller('PostEditorCtrl', ['$scope', 'data',
    function($scope, data) {

        // Import all data.
        _.extend($scope, data);

        $scope.on_key_down = function(ev) {

            if (ev.which === 9) {
                // TAB to indent.
                ev.preventDefault();
                // TODO: insert a TAB at current caret.

            } else if (ev.which === 83) {
                // meta+s / ctrl+s
                if (($scope.os === 'windows' && ev.ctrlKey)
                    || ($scope.os === 'macos' && ev.metaKey)) {
                    ev.preventDefault();
                    // TODO: save draft.
                }
            }
        }
    }
]);
