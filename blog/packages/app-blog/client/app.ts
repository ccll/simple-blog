declare var Meteor;
declare var App;
declare var angular;
declare var Session;
declare var Deps;
declare var Accounts;
declare var $;
declare var _;
declare var encodeURIComponent;
declare var console;
declare var alert;
declare var window;
declare var parseInt;
declare var Angularite;
declare var Spiderable;

var App = Angularite.module('blogApp', ['ui.router']);
this.App = App;

Spiderable.makeSpiderable(App);

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
  (function () {
    var noop = function () {
    };
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = {};
    while (length--) {
      console[methods[length]] = noop;
    }
  }());
}

// $scope.safeApply()
App.config([
  '$provide', function ($provide) {
    return $provide.decorator('$rootScope', [
      '$delegate', function ($delegate) {
        $delegate.safeApply = function (fn) {
          var phase = $delegate.$$phase;
          if (phase === "$apply" || phase === "$digest") {
            if (fn && typeof fn === 'function') {
              fn();
            }
          } else {
            $delegate.$apply(fn);
          }
        };
        return $delegate;
      }
    ]);
  }
]);


// Hide $anchorScroll provider, to disable auto-scroll-back-to-top when you switch states.
// Use $scrollTo() to scroll with animation, see 'providers.js'.
App.value('$anchorScroll', angular.noop);

/** 将屏幕滚动到指定的element或offset **/
var $ScrollToProvider = function () {
  this.$get = ['$timeout', function ($timeout) {

    function scroll(settings) {
      return function () {
        if ('elem' in settings) {
          if (settings.hasOwnProperty('elem')) {
            $('html, body').animate({
                  scrollTop: $(settings.elem).offset().top
                },
                settings
            );
          }
        } else if ('offset' in settings) {
          if (settings.hasOwnProperty('offset')) {
            $('html, body').animate({
                  scrollTop: settings.offset
                },
                settings
            );
          }
        }
      }
    }

    function wrapper(settings) {
      if ('duration' in settings) {
        if (settings.hasOwnProperty('duration')) {
          $timeout(scroll(settings));
        }
      }
      else {
        return scroll(settings);
      }

    }

    return wrapper;
  }];
};
App.provider('$scrollTo', $ScrollToProvider);


// Detect 'enter' press event.
App.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});


// range filter, usage: ... ng-repeat="n in [0, 10] | range" ...
App.filter('range', function () {
  return function (input) {
    var lowBound, highBound;
    switch (input.length) {
      case 1:
        lowBound = 0;
        highBound = parseInt(input[0]) - 1;
        break;
      case 2:
        lowBound = parseInt(input[0]);
        highBound = parseInt(input[1]);
        break;
      default:
        return input;
    }
    var result = [];
    for (var i = lowBound; i <= highBound; i++)
      result.push(i);
    return result;
  };
});


App.controller('MainCtrl', ['$scope', '$rootScope', '$state',
  function ($scope, $rootScope, $state) {

  }
]);
