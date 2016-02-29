angular.module('eve')
.controller('NavBarCtrl', function($scope, $location) {
  $scope.currentUrl = $location.$$url;

  $scope.$on('$locationChangeSuccess', function() {
    $scope.currentUrl = $location.url();
  });
});
