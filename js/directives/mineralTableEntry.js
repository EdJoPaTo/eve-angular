angular.module('eve')
.directive('mineralTableEntry', function () {
  return {
    restrict: "A",
    scope: {
      itemId: "="
    },
    templateUrl: 'templates/directives/mineralTableEntry.html',
    link: function (scope, element, attr) {
      console.log(scope.itemId);
      scope.amount = 1;
    }
  };
});
