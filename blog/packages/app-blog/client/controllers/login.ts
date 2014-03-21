declare var App;

App.controller('LoginCtrl', ['$rootScope', '$state',
    function($rootScope, $state) {
        $rootScope.login = true;
        $state.go('post-list');
    }
]);
