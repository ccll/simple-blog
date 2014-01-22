declare var console;
declare var Meteor;
declare var ngMeteor;
declare var Template;
declare var decodeURIComponent;

ngMeteor.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('post-list', {
            url: "/?tag&page",
            template: Template['post-list'],
            resolve: {
                data: ['post_list', '$stateParams', function(post_list, $stateParams) {
                    return post_list.get($stateParams);
                }]
            },
            controller: 'PostListCtrl'
        });

        $stateProvider
            .state('post-detail', {
                url: "/post/:id",
                template: Template['post-detail'],
                resolve: {
                    data: ['post', '$stateParams', function(post, $stateParams) {
                        return post.get($stateParams.id);
                    }]
                },
                controller: 'PostDetailCtrl'
            });
    }
]);
