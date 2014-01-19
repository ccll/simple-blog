declare var console;
declare var ngMeteor;
declare var Template;

ngMeteor.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('post-list', {
            url: "/?tag&page",
            template: Template['post-list']
        });

        $stateProvider
            .state('post-detail', {
                url: "/post/:id",
                template: Template['post-detail']
            });
    }
]);
