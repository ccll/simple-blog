declare var ngMeteor;

ngMeteor.controller('LoginCtrl', ['$rootScope', '$state',
    function($rootScope, $state) {
        $rootScope.login = true;
        $state.go('post-list');
    }
]);
