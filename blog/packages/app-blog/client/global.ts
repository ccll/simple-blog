declare var App;
declare var Meteor;
declare var window;
declare var console;
declare var alert;
declare var encodeURIComponent;
declare var Date;
declare var Deps;
declare var navigator;
declare var Random;

function find_out_os(): string {
    if (navigator.appVersion.indexOf("Win")!=-1)
        return "windows";
    if (navigator.appVersion.indexOf("Mac")!=-1)
        return "macos";
    if (navigator.appVersion.indexOf("Linux")!=-1)
        return "linux";
    if (navigator.appVersion.indexOf("X11")!=-1)
        return "unix";

    return "unknown";
}

// 设置全局可以访问的对象和数据
App.run(['$rootScope', '$state', '$stateParams',
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

        // Find out OS.
        $rootScope.os = find_out_os();

        // Generate random id.
        $rootScope.random_id = function(): string {
            return Random.id();
        };
    }
]);
