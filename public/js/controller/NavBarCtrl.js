angular.module('eve')
.controller('NavBarCtrl', function($scope, $location) {
  $scope.$on('$locationChangeSuccess', function() {
    $scope.open = false;
  });
});
