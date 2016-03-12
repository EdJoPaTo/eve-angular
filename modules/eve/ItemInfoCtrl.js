angular.module( 'eve' )
  .controller( 'ItemInfoCtrl', function( $scope, $filter, allMarketItemsService, typeInfoService ) {
    $scope.items = [];
    $scope.currentitem = {};
    $scope.currentTypeInfo = {};

    allMarketItemsService( function( items ) {
      $scope.items = $scope.items.concat( items );
    } );

    $scope.selectitem = function( item ) {
      $scope.currentitem = item;
    };

    $scope.getTypeInfo = function( item ) {
      typeInfoService( item.id ).then( function( typeInfo ) {
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
