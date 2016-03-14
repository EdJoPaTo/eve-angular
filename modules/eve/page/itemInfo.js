angular.module( 'eve' )
  .controller( 'ItemInfoCtrl', function( $scope, $filter, allMarketItemsService, typeInfoService ) {
    $scope.items = [];
    $scope.stillloading = true;
    $scope.currentitem = {};
    $scope.currentTypeInfo = {};

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

    $scope.getTypeInfo = function( item ) {
      typeInfoService( item.id ).then( function( typeInfo ) {
        if ( !$scope.currentitem ) return;
        if ( typeInfo.id != $scope.currentitem.id ) return;
        $scope.currentTypeInfo = typeInfo;
      } );
    };

    $scope.$watch( 'q', function( newValue ) {
      $scope.currentitem = $filter( 'filter' )( $scope.items, $scope.q )[ 0 ];
    } );

    $scope.$watch( 'currentitem', function( newValue ) {
      if ( !$scope.currentitem || !$scope.currentitem.id ) return;
      $scope.getTypeInfo( $scope.currentitem );
    } );
  } );
