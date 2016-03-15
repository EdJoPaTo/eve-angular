angular.module( 'eve-estimator' )
  .controller( 'ItemEstimatorCtrl', function( $scope, $route, $routeParams, crestMarketService, crestRegionsService, itemsFromStringService ) {
    $scope.pricetype = $routeParams.pricetype || 'sell';
    $scope.items = [];
    $scope.regions = [];
    $scope.region = Number( $routeParams.region ) || 10000002;
    $scope.stillloading = true;

    crestMarketService.getAllMarketItems().then( function( allItems ) {
      $scope.items = allItems;
    }, function( error ) {
      $scope.error = error;
    }, function( part ) {
      $scope.items = part.items;
    } ).finally( function() {
      $scope.stillloading = false;
    } );

    crestRegionsService.getAll().then( function( allRegions ) {
      $scope.regions = allRegions;
    } );

    $scope.$watch( 'pricetype', function( newValue, oldValue ) {
      if ( newValue === oldValue ) return;
      $route.updateParams( {
        pricetype: newValue === 'buy' ? 'buy' : null
      } );
    } );

    $scope.$watch( 'region', function( newValue, oldValue ) {
      if ( newValue === oldValue ) return;
      $route.updateParams( {
        region: newValue !== 10000002 ? newValue : null
      } );
    } );

    function getItemPriceAndAdd( item ) {
      if ( !$scope.region ) return;
      if ( !item ) return;
      if ( !$scope.pricetype ) return;

      crestMarketService.getBestPrice( $scope.region, item.id, $scope.pricetype )
        .then( function( price ) {
          if ( $scope.currentitems.filter( i => i.id == item.id ).length ) return;
          item.price = price;
          item.fullprice = price * item.amount;
          $scope.currentitems.push( item );
        } );
    }

    $scope.input = "3.000  Veldspar\n2  Logic Circuit\nXR-3200 Heavy Missile Bay\nFried Interface Circuit  30  Salvaged Materials  0,30 m3\nPower Circuit  2  Salvaged Materials  0,02 m3\nSisters Core Scanner Probe  8  Scanner Probe  0,80 m3";

    $scope.$watchGroup( [ 'input', 'items' ], function(newValue, oldValue) {
      if (newValue === oldValue) return;
      var itemsInInput = itemsFromStringService( $scope.items, $scope.input );

      $scope.currentitems = [];
      for ( var i = 0; i < itemsInInput.length; i++ ) {
        getItemPriceAndAdd( itemsInInput[ i ] );
      }

    } );
  } );
