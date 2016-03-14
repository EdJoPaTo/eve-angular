angular.module( 'eve' )
  .controller( 'ItemInfoCtrl', function( $scope, $filter, allMarketItemsService, typeInfoService ) {
    $scope.items = [];
    $scope.stillloading = true;
    $scope.currentitem = {};
    $scope.currentTypeInfo = {};

    allMarketItemsService( function( items, finished ) {
      $scope.items = $scope.items.concat( items );
      $scope.stillloading = !finished;
    }, function( e ) {
      $scope.error = e;
    } );

    $scope.selectitem = function( item ) {
      $scope.currentitem = item;
    };

    $scope.getTypeInfo = function( item ) {
      typeInfoService( item.id ).then( function( typeInfo ) {
        if ( !$scope.currentitem ) return;
        if ( typeInfo.id != $scope.currentitem.id ) return;
        $scope.currentTypeInfo = typeInfo;
      } )
    }

    $scope.$watch( 'q', function( newValue ) {
      $scope.currentitem = $filter( 'filter' )( $scope.items, $scope.q )[ 0 ];
    } )

    $scope.$watch( 'currentitem', function( newValue ) {
      if ( !$scope.currentitem || !$scope.currentitem.id ) return;
      $scope.getTypeInfo( $scope.currentitem );
    } )
  } );