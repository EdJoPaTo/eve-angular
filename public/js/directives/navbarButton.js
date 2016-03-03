angular.module('eve')
.directive('navbarButton', ['$location', function (location) {
  return {
    restrict: "A",
    scope: {
      url: "@",
      text: "@",
      glyphicon: "@"
    },
    template: '<a href="#{{url}}"><span ng-show="glyphicon" class="glyphicon" ng-class="glyphicon"></span> {{text}}</a>',
    link: function (scope, element, attr) {
      scope.$on('$locationChangeSuccess', function() {
        if (location.url().startsWith(scope.url)) {
          element.addClass("active");
        } else {
          element.removeClass("active");
        }
      });
    }
  };
}]);
