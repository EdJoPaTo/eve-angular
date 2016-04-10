angular.module('eve')
.controller('miningCtrl', function ($scope, $routeParams, $location, $route) {
  $scope.miner = 1;
  $scope.volume = 1000;
  $scope.cycletime = 60;

  $scope.pricetype = $routeParams.pricetype;
  $scope.$watch('pricetype', function(newValue, oldValue){
    if (oldValue == newValue) return;
    $route.updateParams({pricetype: newValue});
  });

  if ($routeParams.kind === 'ore' || $routeParams.kind === 'ice' || $routeParams.kind === 'gas'  || $routeParams.kind === 'whgas' || $routeParams.kind === 'all') {
    $scope.kind = $routeParams.kind;
  } else {
    $route.updateParams({kind: 'ore'});
  }
  $scope.$watch('kind', function(newValue, oldValue){
    if (oldValue == newValue) return;
    $route.updateParams({kind: newValue});
  });

  $scope.editmode = $routeParams.editmode;
  $scope.$watch('editmode', function(newValue, oldValue){
    if (oldValue == newValue) return;
    if (newValue) {
      $route.updateParams({editmode: newValue});
    } else  {
      $location.url($location.url().replace('editmode', ''));
    }
  });

  $scope.showmineraltable = function (kind) {
    if (kind == "gas" || kind == "whgas") {
      return false;
    }
    return true;
  };
});
