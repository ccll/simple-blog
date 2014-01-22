/// <reference path='../../shared/models.ts' />

declare var ngMeteor;
declare var Meteor;
declare var _;
declare var marked;

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

ngMeteor.directive('markdown', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.markdown) {
                scope.$watch(attrs.markdown, function (newVal) {
                    var html = newVal ? marked(newVal) : '';
                    element.html(html);
                });
            } else {
                var html = marked(element.text());
                element.html(html);
            }
        }
    };
});

ngMeteor.factory('post', ['$q', '$rootScope',
    function ($q, $rootScope) {
        return {
            get: function (post_id:string):Post {
                var defer = $q.defer();
                Meteor.call('post', post_id, function (err, post) {
                    $rootScope.safeApply(function () {
                        if (err) {
                            defer.resolve({err: err});
                        } else {
                            defer.resolve({post: post});
                        }
                    });
                });
                return defer.promise;
            }
        }
    }
]);

ngMeteor.controller('PostDetailCtrl', ['$scope', 'data',
    function ($scope, data) {
        _.extend($scope, data);
    }
]);
