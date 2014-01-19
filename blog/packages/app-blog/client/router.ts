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
            controller: 'PostListCtrl',
            resolve: {
                data: ['$q', '$stateParams', '$rootScope',
                    function($q, $stateParams, $rootScope) {
                        var defer = $q.defer();
                        var tag = $stateParams.tag ? decodeURIComponent($stateParams.tag) : '';
                        var page = $stateParams.page || 1;
                        Meteor.call('post_list', tag, page, function(err, post_list) {
                            $rootScope.$apply(function() {
                                if (err) {
                                    defer.resolve({err: err});
                                    return;
                                }

                                defer.resolve({tag: tag, page: page, post_list: post_list});
                            });
                        });
                        return defer.promise;
                    }
                ]
            }
        });

        $stateProvider
            .state('post-detail', {
                url: "/post/:id",
                template: Template['post-detail']
            });
    }
]);
