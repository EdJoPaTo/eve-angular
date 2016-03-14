angular.module( 'eve' )
  .controller( 'ItemInfoCtrl', function( $scope, $filter, allMarketItemsService ) {
    $scope.items = [];
    $scope.stillloading = true;
    $scope.currentitem = {};

    allMarketItemsService().then( function( allItems ) {
      $scope.items = allItems;
    }, function( error ) {
      $scope.error = error;
    }, function( itemsPart ) {
      $scope.items = itemsPart;
    } ).finally( function() {
      $scope.stillloading = false;
    } );

    $scope.selectitem = function( item ) {
      $scope.currentitem = item;
    };

    $scope.$watch( 'items', () => updateCurrentSelectedItem() );
    $scope.$watch( 'q', () => updateCurrentSelectedItem() );

    function updateCurrentSelectedItem() {
      $scope.selectitem( $filter( 'filter' )( $scope.items, $scope.q )[ 0 ] );
    }
  } );
