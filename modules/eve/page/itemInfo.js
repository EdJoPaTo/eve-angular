angular.module( 'eve' )
  .controller( 'ItemInfoCtrl', function( $scope, $route, $routeParams, $filter, allMarketItemsService ) {
    $scope.itemsInList = 25;
    $scope.items = [];
    $scope.stillloading = true;
    $scope.currentitems = [];
    $scope.selecteditem = $routeParams.id;
    $scope.q = $routeParams.q || $routeParams.id;

    allMarketItemsService().then( function( allItems ) {
      $scope.items = allItems;
    }, function( error ) {
      $scope.error = error;
    }, function( part ) {
      $scope.items = part.items;
    } ).finally( function() {
      $scope.stillloading = false;
    } );

    $scope.selectitem = function( itemId ) {
      $scope.selecteditem = itemId;
      $route.updateParams( {
        id: $scope.selecteditem
      } );
    };

    $scope.$watchGroup( [ 'items', 'q' ], function() {
      $scope.currentitems = $filter( 'filter' )( $scope.items, $scope.q );
      if ( !$routeParams.id ) {
        // Nur wenn es keine Itemauswahl gibt das oberste Suchitem auswählen
        $scope.selecteditem = $scope.currentitems[ 0 ] ? $scope.currentitems[ 0 ].id : null;
      }
    } );

    $scope.$watch( 'q', function( newValue, oldValue ) {
      if ( !oldValue ) return;
      if ( oldValue === newValue ) return;
      // Wenn sich der Suchtext ändert die Itemauswahl resetten
      $route.updateParams( {
        q: $scope.q || null,
        id: null
      } );
    } );
  } );
