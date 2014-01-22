declare var ngMeteor;
declare var Meteor;
declare var window;
declare var console;
declare var alert;
declare var encodeURIComponent;
declare var Date;
declare var Deps;

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

        // Format post date to human readable string.
        $rootScope.format_date = function(ms:number):string {
            return new Date(ms).toLocaleString();
        };

        // Auto update $user.
        Deps.autorun(function() {
            $rootScope.safeApply(function() {
                $rootScope.$user = Meteor.user();
            });
        });

    }
]);
