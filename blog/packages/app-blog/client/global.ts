declare var ngMeteor;
declare var window;
declare var console;
declare var alert;
declare var encodeURIComponent;

// 设置全局可以访问的对象和数据
ngMeteor.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        window.$rootScope = $rootScope;

        // ui-router
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Global functions.
        $rootScope.console = console;
        $rootScope.alert = alert;
        $rootScope.encodeURIComponent = encodeURIComponent;

        // Tags.

    }
]);
