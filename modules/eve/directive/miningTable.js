angular.module( 'eve' )
  .directive( 'miningTable', function( crestMarketService, typeInfoService ) {
    return {
      restrict: "E",
      scope: {
        pricetype: "=",
        kind: "=",
        filter: "=",
        editmode: "=",
        region: "=",
        volume: "="
      },
      templateUrl: 'eve/directive/miningTable.html',
      link: function( scope, element, attr ) {
        scope.region = 10000002;

        scope.rawmaterial = [];

        function loadMarketGroup( marketGroupId ) {
          crestMarketService.getItemsOfMarketGroup( marketGroupId )
            .then( data => data.map( v => v.id ) )
            .then( function( ids ) {
              for ( var i = 0; i < ids.length; i++ ) {
                loadTypeId( ids[ i ] );
              }
            } );
        }

        function loadTypeId( itemId ) {
          typeInfoService( itemId ).then( function( typeInfo ) {
            if ( !typeInfo.published ) return;
            if ( typeInfo.name.startsWith("Compressed ")) return;

            scope.rawmaterial.push( typeInfo );
          } );
        }

        if ( scope.kind === 'ore' || scope.kind === 'all' ) {
          // high sec
          loadMarketGroup( 518 ); //Veldspar
          loadMarketGroup( 515 ); //Pyroxeres
        }
        if ( scope.kind === 'ice' || scope.kind === 'all' ) {
          loadMarketGroup( 1855 );
        }
        if ( scope.kind === 'gas' || scope.kind === 'all' ) {
          loadMarketGroup( 983 );
        }
        if ( scope.kind === 'whgas' || scope.kind === 'all' ) {
          loadMarketGroup( 1859 );
        }
      }
    };
  } );
